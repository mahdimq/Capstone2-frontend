import {
	LOGIN_USER,
	REGISTER_USER,
	LOGOUT_USER,
	UPDATE_USER,
	FETCH_USER,
	ADD_MOVIE,
	GET_MOVIE,
	REMOVE_MOVIE,
	ADD_WATCHLIST,
	REMOVE_WATCHLIST,
	LOAD_WATCHLIST,
	ADD_ALERT,
	REMOVE_ALERTS,
	GET_USER_INFO
} from './actionTypes';

import WatchlistAPI from '../WatchlistAPI';

// ########################################################
// ############### ALERTS STATE MANAGEMENT ################
// ########################################################
// DISPLAY ALERTS TO USER
export const addAlert = (message, type) => {
	return { type: ADD_ALERT, payload: { message, type } };
};

export const removeAlerts = () => {
	return { type: REMOVE_ALERTS };
};

// ########################################################
// ################ USER STATE MANAGEMENT #################
// ########################################################
// LOGIN USER
export const loginUser = (data) => {
	return async function (dispatch) {
		try {
			const user = await WatchlistAPI.login(data);
			localStorage.setItem('user-token', user.token);
			await dispatch(userLoggedIn(user));
			await dispatch(addAlert(`Welcome back ${user.username}`, 'success'));
		} catch (err) {
			err.forEach((error) => dispatch(addAlert(error, 'error')));
		}
	};
};

// user logged in
export const userLoggedIn = (user) => {
	return { type: LOGIN_USER, payload: user };
};

// =====================================================
// GET USER DATA
export const getUserData = (token, username, id) => {
	return { type: FETCH_USER, payload: { token, username, id } };
};

// =====================================================
// GET USER BIO
export const getUserInfo = (id) => {
	return async function (dispatch) {
		try {
			const user = await WatchlistAPI.getUser(id);
			return dispatch(getUserBio(user));
		} catch (err) {
			err.forEach((error) => dispatch(addAlert(error, 'error')));
		}
	};
};

function getUserBio(user) {
	return { type: GET_USER_INFO, payload: user };
}

// =====================================================
// UPDATE USER
export const updateUser = (id, data) => {
	return async function (dispatch) {
		try {
			const user = await WatchlistAPI.updateUser(id, data);
			await dispatch(userUpdated(user));
			await dispatch(addAlert(`User Information updated!`, 'info'));
		} catch (err) {
			err.forEach((error) => {
				dispatch(addAlert(error, 'error'));
				// dispatch(addAlert('Invalid Password', 'error'));
			});
		}
	};
};

// updated user
const userUpdated = (user) => {
	return { type: UPDATE_USER, payload: user };
};

// =====================================================
// REGISTER A NEW USER
export const registerUser = (data) => {
	return async function (dispatch) {
		try {
			const user = await WatchlistAPI.register(data);
			localStorage.setItem('user-token', user.token);
			await dispatch(userRegistered(user));
			await dispatch(
				addAlert(`Registration Successful! Welcome ${data.username}!`, 'success')
			);
		} catch (err) {
			err.forEach((error) => dispatch(addAlert(error, 'error')));
		}
	};
};

// user registered
const userRegistered = (user) => {
	return { type: REGISTER_USER, payload: user };
};

// =====================================================
// DELETE USER
export const removeUser = (id, token) => {
	return async function (dispatch) {
		try {
			await WatchlistAPI.deleteUser(id, token);
			dispatch(addAlert('User has been deleted', 'error'));
			await dispatch(logout());
		} catch (err) {
			err.forEach((error) => {
				dispatch(addAlert(error, 'error'));
			});
		}
	};
};

// =====================================================
// LOGOUT USER
export const logoutUser = () => {
	return async function (dispatch) {
		await dispatch(logout());
		await dispatch(addAlert('User logged out', 'warning'));
	};
};
export const logout = () => {
	return { type: LOGOUT_USER };
};

// ########################################################
// ################ MOVIE STATE MANAGEMENT ################
// ########################################################
// ADD MOVIE TO DATABASE
export const addMovie = (data) => {
	return async function (dispatch) {
		try {
			const res = await WatchlistAPI.addMovie(data);
			await dispatch(movieAdded(res));
		} catch (err) {
			console.error(err);
		}
	};
};

// movie added
const movieAdded = (movieData) => {
	return { type: ADD_MOVIE, payload: movieData };
};

// =====================================================

// RETRIEVE MOVIE FROM DATABASE
export const getMovie = (id) => {
	return async function (dispatch) {
		const res = await WatchlistAPI.getMovie(id);
		await dispatch(gotMovie(res));
	};
};

// got movie
const gotMovie = (movieData) => {
	return { type: GET_MOVIE, payload: movieData };
};

// =====================================================
// GET ALL MOVIES FROM DATABASE (test)
export const getAllFilms = () => {
	return async function (dispatch) {
		const movies = await WatchlistAPI.getAllMovies();
		await dispatch(gotMovie(movies));
	};
};

// =====================================================

// REMOVE MOVIE FROM DATABASE
export const removeMovie = (id) => {
	return async function (dispatch) {
		await WatchlistAPI.deleteMovie(id);
		await dispatch(movieRemoved());
	};
};

const movieRemoved = () => {
	return {
		type: REMOVE_MOVIE
	};
};

// =====================================================

// ########################################################
// ############# WATCHLIST STATE MANAGEMENT ###############
// ########################################################
// ADD MOVIE TO WATCHLIST
export const addToWatchlist = (user_id, data) => {
	return async function (dispatch) {
		try {
			const res = await WatchlistAPI.addWatchlist(user_id, data);
			await dispatch(addedWatchlist(res));
			await dispatch(addAlert('Movie added to watchlist', 'info'));
		} catch (err) {
			err.forEach((error) => {
				dispatch(addAlert(error, 'error'));
			});
		}
	};
};

// added to watchlist
const addedWatchlist = (movieData) => {
	return { type: ADD_WATCHLIST, payload: movieData };
};

// RETRIEVE WATCHLIST FROM DATABASE
export const loadWatchlist = (user_id) => {
	return async function (dispatch) {
		try {
			const res = await WatchlistAPI.getWatchlist(user_id);
			if (!res) await dispatch(addAlert('NO MOVIES FOUND IN WATCHLIST', 'warning'));
			await dispatch(gotWatchlist(res));
		} catch (err) {
			err.forEach((error) => {
				dispatch(addAlert(error, 'error'));
			});
		}
	};
};

const gotWatchlist = (watchlist) => {
	return { type: LOAD_WATCHLIST, payload: watchlist };
};

// REMOVE FROM WATCHLIST
export const removeWatchlist = (user_id, movie_id) => {
	return async function (dispatch) {
		await WatchlistAPI.deleteWatchlist(user_id, movie_id);
		await dispatch(removedWatchlist(movie_id));
		await dispatch(addAlert('Movie removed from watchlist', 'info'));
	};
};

// removed from watchlist
const removedWatchlist = (movie_id) => {
	return { type: REMOVE_WATCHLIST, payload: movie_id };
};
