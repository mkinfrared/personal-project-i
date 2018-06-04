import axios from 'axios';

const initialState = {
	movies          : [],
	moviesOnScreen  : [],
	screenings      : [],
	currentMovieInfo: {}
};

const UPDATE_MOVIES_ONSCREEN    = 'UPDATE_MOVIES_ONSCREEN',
	  UPDATE_SCREENINGS         = 'UPDATE_SCREENINGS',
	  UPDATE_MOVIES             = 'UPDATE_MOVIES',
	  UPDATE_CURRENT_MOVIE_INFO = 'UPDATE_CURRENT_MOVIE_INFO';

export default function screeningReducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_MOVIES_ONSCREEN + '_FULFILLED':
			return Object.assign({}, state, {moviesOnScreen: action.payload || []});
		case UPDATE_SCREENINGS + '_FULFILLED':
			return Object.assign({}, state, {screenings: action.payload});
		case UPDATE_MOVIES + '_FULFILLED':
			return Object.assign({}, state, {movies: action.payload});
		case UPDATE_CURRENT_MOVIE_INFO + '_FULFILLED':
			return Object.assign({}, state, {currentMovieInfo: action.payload});
		default:
			return state;
	}
}

export function updateMoviesOnScreen() {
	const moviesList = axios.get('/api/showtimes/movies_on_screen')
							.then((resp) => resp.data)
							.catch((err) => console.log(err));

	return {
		type   : UPDATE_MOVIES_ONSCREEN,
		payload: moviesList
	}
}

export function updateScreenings() {
	const screeningList = axios.get('/api/showtimes')
							   .then((resp) => resp.data)
							   .catch((err) => console.error(err));

	return {
		type   : UPDATE_SCREENINGS,
		payload: screeningList
	}
}

export function updateMovies() {
	const movieList = axios.get('/api/movies')
						   .then((resp) => resp.data)
						   .catch((err) => console.log(err));

	return {
		type   : UPDATE_MOVIES,
		payload: movieList
	}
}

export function updateCurrentMovieInfo(id) {
	const movieInfo = axios.get(`/api/movies/${id}`)
						   .then((resp) => resp.data[0])
						   .catch((err) => console.error(err));

	return {
		type   : UPDATE_CURRENT_MOVIE_INFO,
		payload: movieInfo
	}
}