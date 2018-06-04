import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateMoviesOnScreen} from '../../../../ducks/screening_reducer';
import './MovieLIst.css'

function MovieList(props) {
	const rowGenerator = (movieList) => {
		const {updateMoviesOnScreen} = props;

		const rows = movieList.map((movie, index) => {
			const {id, title, release_date, on_screen} = movie;

			return (
				<tr key={id}>
					<td>{index + 1}</td>
					<td>
						{title}
						<Link to={`/admin/movie/${id}`}>
							<i className="fas fa-edit"></i>
						</Link>
					</td>
					<td>{new Date(release_date).toLocaleDateString("en-US")}</td>
					<td>
						<label className="checkbox-container">
							<input type="checkbox" defaultChecked={on_screen} onChange={(ev) => {
								axios.put('/api/movies/update_movie', {...movie, on_screen: ev.target.checked})
									 .then(() => updateMoviesOnScreen())
									 .catch((err) => console.error(err));
							}}/><span className="checkmark"></span>
						</label>
					</td>
				</tr>
			);
		});

		return rows;

	};

	return (
		<table className="movie-list table table-hover table-striped table-dark">
			<thead className="thead-dark">
			<tr>
				<td>#</td>
				<td>Title</td>
				<td>Release Date</td>
				<td>On Screen</td>
			</tr>
			</thead>
			<tbody>
			{rowGenerator(props.movies)}
			</tbody>
		</table>
	);
}

function mapStateToProps({showtimes}) {
	const {movies} = showtimes;

	return {movies};
}

export default connect(mapStateToProps, {
	updateMoviesOnScreen
})(MovieList)