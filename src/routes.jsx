import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';

export default (
	<Switch>
		<Route exact path="/" component={Home}/>
		<Route path="/admin" component={Admin}/>
	</Switch>
)