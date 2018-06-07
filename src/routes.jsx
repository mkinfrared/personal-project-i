import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import Showtimes from './components/Showtimes/Showtimes';
import TicketPurshase from './components/TicketPurchase/TicketPurchase';

export default (
	<Switch>
		<Route exact path="/" component={Home}/>
		<Route path="/admin" component={Admin}/>
		<Route exact path="/showtimes" component={Showtimes}/>
		<Route path={`/showtimes/:screening_id`} component={TicketPurshase}/>
	</Switch>
)