import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateMoviesOnScreen, updateComingSoon} from '../../../ducks/screening_reducer';
import './TodayScreen.css'

class TodayScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			moviesOnScreen  : [],
			comingSoonMovies: []
		}
	}

	componentWillMount() {
		this.props.updateMoviesOnScreen();
		// this.props.updateComingSoon();
	}

	componentWillReceiveProps(nextProps) {
		let {moviesOnScreen} = nextProps;

		moviesOnScreen = moviesOnScreen.map((movie) => {
			return (
				<Link key={movie.id} to={`/movie/${movie.id}`}>
					<div className="movie-card">
						<img src={movie.poster_pic} alt={movie.title}/>
						<p>{movie.title}</p>
					</div>
				</Link>
			);
		});

		this.setState({moviesOnScreen})
	}


	render() {
		return (
			<div className="today-screen">
				<h1>Movies at MAJESTIC</h1>
				<ul className="nav nav-tabs">
					<li className="nav-item">
						<a className="nav-link active" href="#">Now playing</a>
					</li>
				</ul>
				<div className="movie-cards-block">
					<div className="now-playing">
						{this.state.moviesOnScreen}
					</div>
					<div className="coming-soon">
					</div>
				</div>
			</div>

		);
	}

}

function mapStateToProps({showtimes}) {
	const {moviesOnScreen} = showtimes;

	return {moviesOnScreen};
}

export default connect(mapStateToProps, {
	updateMoviesOnScreen,
	updateComingSoon
})(TodayScreen)