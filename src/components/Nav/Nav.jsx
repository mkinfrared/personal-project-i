import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/user_reducer';

class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {}
		}
	}

	componentWillMount() {
		const {getUser} = this.props;

		getUser();
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
	}


	componentWillUpdate(nextProps, nextState) {
		console.log(nextProps)
	}

	componentDidUpdate(prevProps, prevState) {

	}


	loggedIn() {
		const {user} = this.props;

		return (
			<div className="logged-in">
				<img src={user.picture} alt="userpic"/>
				<div className="user-block">
					<div>
						<p className="username">{user.username}</p>
						<p className="log-out">Log Out</p>
					</div>
				</div>
			</div>
		);
	}

	loggedOut() {
		return <a href={process.env.REACT_APP_LOGIN}>Login</a>
	}

	render() {
		const {user} = this.props;
		const {admin} = this.props.user || false;

		return (
			<nav>
				<div className="logo">
					<img src="/images/logo-without-url.png" alt="logo"/>
					<p>Majestic</p>
				</div>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/showtimes">Movies</Link>
					</li>
					{(admin) ?
						<li>
							<Link to="/admin">Admin</Link>
						</li>
						: null}
				</ul>
				{(user) ? this.loggedIn() : this.loggedOut()}
			</nav>
		)
	}
}

function mapStateToProps({users}) {
	return users
}

export default connect(mapStateToProps, {getUser})(Nav)