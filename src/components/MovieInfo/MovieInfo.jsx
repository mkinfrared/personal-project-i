import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {urlChange} from '../../ducks/urls_reducer';
import './MovieInfo.css'

class MovieInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieInfo: {}
		};
	}

	componentWillMount() {
		const {movie_id} = this.props.match.params;
		const {pathname} = this.props.location;

		this.props.urlChange(pathname);

		axios.get(`/api/movies/${movie_id}`)
			 .then((resp) => {
				 this.setState({movieInfo: resp.data[0]});
			 })
			 .catch((err) => console.error(err));
	}

	render() {
		const {
				  actors, banner_pic, description,
				  director, duration_min, genre, mpaa,
				  poster_pic, release_date, studio, tagline,
				  title, writer
			  } = this.state.movieInfo;

		let cast = actors || '';
		cast     = cast.split(', ')
					   .map((elem, i) => <li key={i}><p>{elem}</p></li>);

		const style = {
			backgroundImage: `url("${banner_pic}")`
		};

		return (
			<div className="movie-info" style={style}>
				<h2>{title}</h2>
				<div className="movie-info__wrapper">
					<div className="movie-poster">
						<img src={poster_pic} alt={title}/>
					</div>
					<div className="movie-details">
						<table>
							<tbody>
							<tr>
								<td>Release Date</td>
								<td>{new Date(release_date).toLocaleDateString("en-US")}</td>
							</tr>
							<tr>
								<td>Director</td>
								<td>{director}</td>
							</tr>
							<tr>
								<td>Writer</td>
								<td>{writer}</td>
							</tr>
							<tr>
								<td>MPAA</td>
								<td>{mpaa}</td>
							</tr>
							<tr>
								<td>Genre</td>
								<td>{genre}</td>
							</tr>
							<tr>
								<td>Studio</td>
								<td>{studio}</td>
							</tr>
							<tr>
								<td>Tagline</td>
								<td>{tagline}</td>
							</tr>
							<tr>
								<td>Duration</td>
								<td>{duration_min} min</td>
							</tr>
							</tbody>
						</table>
					</div>
					<div className="cast">
						<ul>
							{cast}
						</ul>
					</div>
				</div>
				<div className="description">
					<h3>Plot</h3>
					<p>{description}</p>
				</div>
			</div>
		);
	}

}

function mapStateToProps() {
	return {}
}

export default connect(mapStateToProps, {urlChange})(MovieInfo)