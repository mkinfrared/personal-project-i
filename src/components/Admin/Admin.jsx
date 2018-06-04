import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, Link} from 'react-router-dom';
import Movie from './Movie/Movie';
import AddMovie from './Movie/AddMovie/AddMovie';
import Screening from './Screening/Screening';
import EditMovie from "./Movie/EditMovie/EditMovie";
import {urlChange} from '../../ducks/urls_reducer';
import './Admin.css'

class Admin extends Component {
	constructor(props) {
		super(props);

	}

	componentWillMount() {
		const {path} = this.props.match;

		this.props.urlChange(path);
	}


	render() {
		return (
			<div className="admin">
				<nav className="sub-navigation navbar navbar-dark bg-primary">
					<ul>
						<li>
							<Link to="/admin/movie">Movies</Link>
						</li>
						<li>
							<Link to="/admin/screening">Screenings</Link>
						</li>
					</ul>
				</nav>
				<Switch>
					<Route exact path="/admin/movie" component={Movie}/>
					<Route path="/admin/movie/add-movie" component={AddMovie}/>
					<Route path="/admin/screening" component={Screening}/>
					<Route path={`/admin/movie/:movie_id`} component={EditMovie}/>
				</Switch>
			</div>
		);
	}

}

function mapStateToProps() {
	return {}
}

export default connect(mapStateToProps, {urlChange})(Admin)