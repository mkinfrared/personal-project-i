import {createStore, applyMiddleware, combineReducers} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import {composeWithDevTools} from 'redux-devtools-extension';
import screeningReducer from './ducks/screening_reducer';
import userReducer from './ducks/user_reducer';
import sliderReducer from './ducks/slider_reducer';
import urlsReducer from './ducks/urls_reducer';

const reducers = combineReducers({
	showtimes  : screeningReducer,
	users      : userReducer,
	slide      : sliderReducer,
	url_address: urlsReducer
});

export default createStore(reducers, composeWithDevTools(applyMiddleware(promiseMiddleware())));
