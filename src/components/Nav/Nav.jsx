import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';
import {connect} from 'react-redux';
import {getUser} from '../../ducks/user_reducer';

class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user           : {},
			hamburgerActive: false
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
			<li className="logged-in nav-link">
				<img src={user.picture} alt="userpic"/>
				<div className="user-block">
						<p className="username">{user.username}</p>
						<a className="log-out"
						   href={process.env.REACT_APP_LOGOUT}>
							Log Out
						</a>
				</div>
			</li>
		);
	}

	loggedOut() {
		return (
			<li className="logged-out nav-link">
				<a href={process.env.REACT_APP_LOGIN}>Login</a>
			</li>
		)
	}

	switchActiveTab(ev) {
		const {hamburgerActive} = this.state;

		const prevActiveTab    = this.refs['nav-fill'].getElementsByClassName('active')[0];
		const currentActiveTab = ev.target;

		prevActiveTab.classList.remove('active');
		currentActiveTab.classList.add('active');

		this.setState({hamburgerActive: !hamburgerActive})
	}

	handleHamburgerClick() {
		const {hamburgerActive} = this.state;

		this.setState({hamburgerActive: !hamburgerActive});
	}


	render() {
		const {user}   = this.props;
		const {admin}  = this.props.user || false;
		const {hamburgerActive} = this.state;

		return (
			<nav ref="navigation" style={this.positionStyle} className="home-navbar navbar navbar-dark bg-dark">
				<div className="logo">
					<img src="/images/logo-without-url.png" alt="logo"/>
					<p>Majestic</p>
				</div>
				<ul className={`nav-pills nav-fill ${(hamburgerActive) ? 'active-nav' : null}`}
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
					<li>
						<Link className={'nav-link'} to="/top-sellers"
							  onClick={(ev) => this.switchActiveTab(ev)}>
							Top Movies
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
					{(user) ? this.loggedIn() : this.loggedOut()}
				</ul>
				<button className={`hamburger hamburger--elastic ${(hamburgerActive) ? 'is-active' : null}`}
						type="button"
						onClick={() => this.handleHamburgerClick()}>
				  <span className="hamburger-box">
					  <span className="hamburger-inner"></span>
				  </span>
				</button>
			</nav>
		)
	}
}

// TODO What to do with logout button

function mapStateToProps({users, url_address}) {
	return {...users, ...url_address};
}

export default connect(mapStateToProps, {getUser})(Nav);