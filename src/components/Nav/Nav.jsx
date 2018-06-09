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
		};

		this.positionStyle = {};

	}

	componentWillMount() {
		const {getUser} = this.props;

		getUser();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.currentURL === '/') {
			this.positionStyle = {
				position: 'absolute',
				opacity : 0.8
			}
		} else {
			this.positionStyle = {};
		}
	}

	loggedIn() {
		const {user} = this.props;

		return (
			<div className="logged-in">
				<img src={user.picture} alt="userpic"/>
				<div className="user-block">
					<div>
						<p className="username">{user.username}</p>
						<a className="log-out"
						   href={process.env.REACT_APP_LOGOUT}>
							Log Out
						</a>
					</div>
				</div>
			</div>
		);
	}

	loggedOut() {
		return (
			<div className="logged-out">
				<a href={process.env.REACT_APP_LOGIN}>Login</a>
			</div>
		)
	}

	switchActiveTab(ev) {
		const prevActiveTab    = this.refs['nav-fill'].getElementsByClassName('active')[0];
		const currentActiveTab = ev.target;

		prevActiveTab.classList.remove('active');
		currentActiveTab.classList.add('active');
	}

	render() {
		const {user}  = this.props;
		const {admin} = this.props.user || false;

		return (
			<nav ref="navigation" style={this.positionStyle} className="home-navbar navbar navbar-dark bg-dark">
				<div className="logo">
					<img src="/images/logo-without-url.png" alt="logo"/>
					<p>Majestic</p>
				</div>
				<ul className="nav-pills nav-fill"
					ref="nav-fill">
					<li className="nav-item">
						<Link className={'nav-link active'} to="/"
							  onClick={(ev) => this.switchActiveTab(ev)}>
							Home
						</Link>
					</li>
					<li>
						<Link className={'nav-link'} to="/showtimes"
							  onClick={(ev) => this.switchActiveTab(ev)}>
							Showtimes
						</Link>
					</li>
					{(admin) ?
					 <li>
						 <Link className={'nav-link'} to="/admin/movie"
							   onClick={(ev) => this.switchActiveTab(ev)}>
							 Admin
						 </Link>
					 </li>
							 : null}
				</ul>
				{(user) ? this.loggedIn() : this.loggedOut()}
			</nav>
		)
	}
}

// TODO What to do with logout button

function mapStateToProps({users, url_address}) {
	return {...users, ...url_address};
}

export default connect(mapStateToProps, {getUser})(Nav);