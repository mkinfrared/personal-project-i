import React, {Component} from 'react';
import MovieList from './MovieList/MovieList';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateMovies} from '../../../ducks/screening_reducer';
import './Movie.css'

class Movie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: []
		}
	}

	componentWillMount() {
		this.props.updateMovies();
	}


	render() {
		return (
			<div className="movie">
				<MovieList/>
				<div>
					<Link to="/admin/movie/add-movie">
						<i className="fas fa-plus-circle"></i>
					</Link>
				</div>
			</div>
		);
	}

}

function mapStateToProps({showtimes}) {
	return {}
}

export default connect(mapStateToProps, {updateMovies})(Movie);