import axios from 'axios';

const initialState = {
	movies          : [],
	moviesOnScreen  : [],
	screenings      : [],
	currentScreening: [],
	currentMovieInfo: {},
	showtimeMovies  : [],
	comingSoonMovies: [],
	reservation     : []
};

const UPDATE_MOVIES_ONSCREEN    = 'UPDATE_MOVIES_ONSCREEN',
	  UPDATE_SCREENINGS         = 'UPDATE_SCREENINGS',
	  UPDATE_MOVIES             = 'UPDATE_MOVIES',
	  UPDATE_CURRENT_MOVIE_INFO = 'UPDATE_CURRENT_MOVIE_INFO',
	  UPDATE_SHOWTIME_MOVIES    = 'UPDATE_SHOWTIME_MOVIES',
	  UPDATE_COMING_SOON        = 'UPDATE_COMING_SOON',
	  UPDATE_CURRENT_SCREENING  = 'UPDATE_CURRENT_SCREENING',
	  UPDATE_SEATS_WANTED       = 'UPDATE_SEATS_WANTED';

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
		case UPDATE_SHOWTIME_MOVIES + '_FULFILLED':
			return Object.assign({}, state, {showtimeMovies: action.payload});
		case UPDATE_COMING_SOON + '_FULFILLED':
			return Object.assign({}, state, {comingSoonMovies: action.payload});
		case UPDATE_CURRENT_SCREENING + '_FULFILLED':
			return Object.assign({}, state, {currentScreening: action.payload});
		case UPDATE_SEATS_WANTED:
			return Object.assign({}, state, {reservation: action.payload});
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

export function updateShowtimeMovies() {
	const movieList = axios.get('/api/showtimes/movies_with_showtime')
						   .then((movies) => movies.data)
						   .catch((err) => console.error(err));

	return {
		type   : UPDATE_SHOWTIME_MOVIES,
		payload: movieList
	}
}

export function updateComingSoon() {
	const movieLIst = axios.get('/api/movies')
						   .then((movies) => {
							   movies = movies.data.filter((elem) => {
								   const day = 24 * 60 * 60 * 1000;
								   new Date(elem.release_date).getTime() > new Date().getTime() + (3 * day);
							   });
							   return movies;
						   });

	return {
		type   : UPDATE_COMING_SOON,
		payload: movieLIst
	}
}

export function updateCurrentScreening(screeningID) {
	const screeningInfo = axios.get(`/api/seat/get/${screeningID}`)
							   .then((resp) => resp.data)
							   .catch((err) => console.error(err));

	return {
		type   : UPDATE_CURRENT_SCREENING,
		payload: screeningInfo
	}
}

export function updateReservation(reservation_id) {
	return {
		type   : UPDATE_SEATS_WANTED,
		payload: reservation_id
	}
}