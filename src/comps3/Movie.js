import React from 'react';
import { useParams } from 'react-router-dom';
import { useMovieHook } from '../hooks/useMovieHook';

// Components
import Navigation from './Navigation';
import MovieInfoBar from '../components/MovieInfoBar';
// import MovieInfo from './components/MovieInfo';
import MovieInfo from './MovieInfo';
import Grid from '../components/Grid';
import Spinner from '../components/Spinner';
import Actor from '../components/Actor';

function Movie() {
	const { movieId } = useParams();
	const [movie, loading, error] = useMovieHook(movieId);

	if (error) return <div>Oops.. Please try again, error!</div>;
	if (loading) return <Spinner />;

	console.log('### MOVIE IN COMPS# ###: ', movie);

	return (
		<div>
			<h1>MOVIE ID: {movieId}</h1>
			<MovieInfo movie={movie} />
			<MovieInfoBar time={movie.runtime} released={movie.release_date} revenue={movie.revenue} />
			<Grid header='Actors'>
				{movie.actors.map((actor) => (
					<Actor key={actor.credit_id} actor={actor} />
				))}
			</Grid>
		</div>
	);
}

export default Movie;
