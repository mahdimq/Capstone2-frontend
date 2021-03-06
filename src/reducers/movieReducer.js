import { ADD_MOVIE, REMOVE_MOVIE, GET_MOVIE } from '../actions/actionTypes';
const INITIAL_STATE = {};

const movieReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ADD_MOVIE:
			return { ...action.payload };

		case GET_MOVIE:
			return { ...state, movie: action.payload };

		case REMOVE_MOVIE:
			return {};

		default:
			return state;
	}
};

export default movieReducer;
