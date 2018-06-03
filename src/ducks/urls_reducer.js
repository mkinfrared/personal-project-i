const initialState = {
	currentURL: '',
	prevURLs  : []
};

const URL_CHANGE = 'URL_CHANGE';

export default function urlReducer(state = initialState, action) {
	switch (action.type) {
		case URL_CHANGE:
			return Object.assign({}, state,
				{
					currentURL: action.payload,
					prevURLs: [state.currentURL, ...state.prevURLs]
				});
		default:
			return state;
	}
}

export function urlChange(newURL) {
	return {
		type   : URL_CHANGE,
		payload: newURL
	}
}