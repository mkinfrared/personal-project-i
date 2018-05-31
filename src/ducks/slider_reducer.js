const initialState = {
	currentIndex: 0,
	maxCount    : 0
};

const CHANGE_MAX_COUNT     = 'CHANGE_MAX_COUNT',
	  CHANGE_CURRENT_INDEX = 'CHANGE_CURRENT_INDEX';

export default function sliderReducer(state = initialState, action) {
	switch (action.type) {
		case (CHANGE_MAX_COUNT):
			return Object.assign({}, state, {maxCount: action.payload});
		case (CHANGE_CURRENT_INDEX):
			return Object.assign({}, state, {currentIndex: action.payload});
		default:
			return state;
	}
}

export function changeMaxCount(num) {
	return {
		type   : CHANGE_MAX_COUNT,
		payload: num
	}
}

export function changeCurrentIndex(num) {
	return {
		type   : CHANGE_CURRENT_INDEX,
		payload: num
	}
}