import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import screeningReducer from './ducks/screening_reducer';

import {composeWithDevTools} from 'redux-devtools-extension';

export default createStore(screeningReducer, composeWithDevTools(applyMiddleware(promiseMiddleware())));
