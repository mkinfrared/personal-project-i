import axios from 'axios';

const initialState = {
	moviesOnScreen: [],
	something: {
		anotherSomething:''
	}
};

const UPDATE_MOVIES_ONSCREEN = 'UPDATE_MOVIES_ONSCREEN';

export default function screeningReducer(state = initialState, action) {
	switch (action.type) {
		case (UPDATE_MOVIES_ONSCREEN + '_FULFILLED'):
			return Object.assign({}, state, {moviesOnScreen: action.payload});
		default:
			return state;
	}
}

export function updateMoviesOnScreen() {
	const moviesList = axios.get('/api/screenings/movies_on_screen')
							.then((resp) => resp.data)
							.catch((err) => console.log(err));

	return {
		type   : UPDATE_MOVIES_ONSCREEN,
		payload: moviesList
	}
}