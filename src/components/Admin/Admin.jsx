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

	changeActiveTab(ev) {
		const prevActiveTab    = this.refs['sub-navigation'].getElementsByClassName('active')[0];
		const currentActiveTab = ev.target;

		prevActiveTab.classList.remove('active');
		currentActiveTab.classList.add('active');
	}

	render() {
		const {user} = this.props;

		return (
			<div className="admin">
				<nav className="sub-navigation navbar navbar-dark bg-primary"
					 ref="sub-navigation">
					<ul>
						<li>
							<Link className={'active'}
								  to="/admin/movie"
								  onClick={(ev) => this.changeActiveTab(ev)}>
								Movies
							</Link>
						</li>
						<li>
							<Link to="/admin/screening"
								  onClick={(ev) => this.changeActiveTab(ev)}
							>Screenings</Link>
						</li>
					</ul>
				</nav>
				{(user && user.admin) ?
				 <Switch>
					 <Route exact path="/admin/movie" component={Movie}/>
					 <Route path="/admin/movie/add-movie" component={AddMovie}/>
					 <Route path="/admin/screening" component={Screening}/>
					 <Route path={`/admin/movie/:movie_id`} component={EditMovie}/>
				 </Switch> :
				 this.props.history.push('/')
				}
			</div>
		);
	}

}

function mapStateToProps({users}) {
	const {user} = users;

	return {user}
}

export default connect(mapStateToProps, {urlChange})(Admin)