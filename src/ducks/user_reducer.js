import axios from 'axios';

const initialState = {
	user: {}
};

const GET_USER = 'GET_USER';

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case(GET_USER + '_FULFILLED'):
			return Object.assign({}, state, {user: action.payload});
		default:
			return state;
	}
}

export function getUser() {
	const userData = axios.get('/auth/me')
						  .then((resp) => resp.data[0])
						  .catch((err) => console.log(err));

	return {
		type   : GET_USER,
		payload: userData
	}
}