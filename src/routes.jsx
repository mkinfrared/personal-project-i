import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import Showtimes from './components/Showtimes/Showtimes';
import TicketPurshase from './components/TicketPurchase/TicketPurchase';
import Receipt from "./components/TicketPurchase/Receipt/Receipt";
import TopSellers from './components/TopSellers/TopSellers';
import MovieInfo from './components/MovieInfo/MovieInfo';

export default (
	<Switch>
		<Route exact path="/" component={Home}/>
		<Route path="/admin" component={Admin}/>
		<Route exact path="/showtimes" component={Showtimes}/>
		<Route path={`/showtimes/:screening_id`} component={TicketPurshase}/>
		<Route path={`/receipt/payment-success`} component={Receipt}/>
		<Route path="/top-sellers" component={TopSellers}/>
		<Route path={`/movie/:movie_id`} component={MovieInfo}/>
	</Switch>
)