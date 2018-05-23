import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import {HashRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
		<App/>, document.getElementById('root'));
registerServiceWorker();
