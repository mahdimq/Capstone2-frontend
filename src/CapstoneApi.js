import axios from 'axios';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

class CapstoneApi {
	static async request(endpoint, paramsOrData = {}, verb = 'get') {
		paramsOrData._token = localStorage.getItem('capstone-token');

		console.debug('API Call:', endpoint, paramsOrData, verb);

		try {
			return (
				await axios({
					method: verb,
					url: `${BASE_URL}/${endpoint}`,
					[verb === 'get' ? 'params' : 'data']: paramsOrData
				})
			).data;
			// axios sends query string data via the "params" key,
			// and request body data via the "data" key,
			// so the key we need depends on the HTTP verb
		} catch (err) {
			console.error('API Error:', err.response);
			let message = err.response.data.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	// ########################################################
	// #################### USER ENDPOINTS ####################
	// ########################################################

	static async login(data) {
		// Data --> USERNAME & PASSWORD
		const res = await this.request(`login`, data, 'post');
		return res.token;
	}

	static async register(data) {
		// Data --> USER INFORMATION (firstname, lastname, email)
		const res = await this.request(`users`, data, 'post');
		return res.token;
	}

	static async getUser(id) {
		const res = await this.request(`users/${id}`);
		return res.user;
	}

	static async updateUser(id, data) {
		const res = await this.request(`users/${id}`, data, 'patch');
		return res.user;
	}

	static async deleteUser(id, token) {
		const res = await this.request(`users/${id}`, { _token: token }, 'delete');
		// return res.message;
		return res.message;
	}

	// ########################################################
	// ################### MOVIE ENDPOINTS ####################
	// ########################################################

	static async addMovie(data) {
		let res = await this.request(`movies/add`, data, 'post');
		console.log(res.movie);
		return res.movie;
	}

	static async getMovie(id) {
		let res = await this.request(`movies/${id}`);
		return res.movie;
	}

	static async getAllMovies() {
		let res = await this.request(`movies/`);
		return res;
	}

	// ########################################################
	// ################# WATCHLIST ENDPOINTS ##################
	// ########################################################

	static async addWatchlist(id, data) {
		let res = await this.request(`watchlist/${id}/add`, data, 'post');
		console.log(res.data);
		return res.data;
	}

	static async getWatchlist(id) {
		let res = await this.request(`watchlist/${id}`);
		return res.data;
	}

	static async deleteWatchlist(user_id, movie_id) {
		let res = await this.request(`watchlist/${user_id}/${movie_id}`, 'delete');
		return res.message;
	}

	// ########################################################
	// ##################### API ENDPOINTS ####################
	// ########################################################

	// static async getLatest() {
	// 	const result = await this.request(`api/`, 'get');
	// 	return result;
	// }

	// static async getTopRated() {
	// 	const result = await this.request(`api/`);
	// 	return result;
	// }

	static async getTrending() {
		const result = await this.request(`api/trending`);
		return result;
	}

	static async getPopular() {
		const result = await this.request(`api/popular`);
		return result;
	}

	static async getComedy() {
		const result = await this.request(`api/comedy`);
		return result;
	}

	static async getAction() {
		const result = await this.request(`api/action`);
		return result;
	}

	// GET MOVIE BY ID
	static async getById(movie_id) {
		const result = await this.request(`api/${movie_id}`);
		return result;
	}

	// GET MOVIE CREDITS BY ID
	static async getMovieCredits(movie_id) {
		const result = await this.request(`api/credits/${movie_id}`);
		return result;
	}
}

export default CapstoneApi;
