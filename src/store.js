import {createStore, applyMiddleware, combineReducers} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import {composeWithDevTools} from 'redux-devtools-extension';
import screeningReducer from './ducks/screening_reducer';
import userReducer from './ducks/user_reducer';
import sliderReducer from './ducks/slider_reducer';

const reducers = combineReducers({
	screenings: screeningReducer,
	users     : userReducer,
	slide     : sliderReducer
});

export default createStore(reducers, composeWithDevTools(applyMiddleware(promiseMiddleware())));
