import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateShowtimeMovies, updateComingSoon} from '../../../ducks/screening_reducer';
import './TodayScreen.css'

class TodayScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showtimeMovies  : [],
			comingSoonMovies: []
		}
	}

	componentWillMount() {
		this.props.updateShowtimeMovies();
		this.props.updateComingSoon();
	}

	componentWillReceiveProps(nextProps) {
		let {showtimeMovies, comingSoonMovies} = nextProps;

		console.log(nextProps);

		showtimeMovies = showtimeMovies.map((movie) => {
			return (
				<div key={movie.id} className="movie-card">
					<img src={movie.poster_pic} alt={movie.title}/>
					<p>{movie.title}</p>
				</div>
			);
		});

		this.setState({showtimeMovies})
	}


	render() {
		return (
			<div className="today-screen">
				<h1>Movies at MAJESTIC</h1>
				<ul className="nav nav-tabs">
					<li className="nav-item">
						<a className="nav-link active" href="#">Now playing</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">Coming soon</a>
					</li>
				</ul>
				<div className="movie-cards-block">
					<div className="now-playing">
						{this.state.showtimeMovies}
					</div>
					<div className="coming-soon">
					</div>
				</div>
			</div>

		);
	}

}

function mapStateToProps({showtimes}) {
	const {showtimeMovies, comingSoonMovies} = showtimes;

	return {showtimeMovies, comingSoonMovies};
}

export default connect(mapStateToProps, {
	updateShowtimeMovies,
	updateComingSoon
})(TodayScreen)