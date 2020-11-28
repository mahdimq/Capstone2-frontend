import { ADD_MOVIE, REMOVE_MOVIE, GET_MOVIE } from '../actions/actionTypes';
const INITIAL_STATE = {};

const movieReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_MOVIE:
			console.log('MOVIE REDUCER ACTION.PAYLOAD', action.payload);
			return { ...action.payload };

		case GET_MOVIE:
			return { ...state, movie: action.payload };

		case REMOVE_MOVIE:
			console.log('## MOVIES ACTION PAYLOAD ##', { movie_id: action.payload.movie_id });
			return { ...state.filter((movie) => movie.id !== action.payload.movie_id) };

		// case REMOVE_MOVIE:
		// 	return {};

		default:
			return state;
	}
};

export default movieReducer;
