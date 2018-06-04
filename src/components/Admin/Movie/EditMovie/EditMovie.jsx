import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateCurrentMovieInfo} from '../../../../ducks/screening_reducer';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './EditMovie.css'

class EditMovie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id          : '',
			title       : '',
			director    : '',
			actors      : '',
			writer      : '',
			studio      : '',
			description : '',
			duration_min: '',
			genre       : '',
			mpaa        : '',
			tagline     : '',
			release_date: '',
			imdb_rating : '',
			poster_pic  : '',
			banner_pic  : '',
			on_screen   : ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.editMovie    = this.editMovie.bind(this);

	}

	handleChange(ev) {
		const {name, value} = ev.target;

		this.setState({[name]: value});
	}

	editMovie() {
		const {state} = this;
		console.log(this.state);

		axios.put('/api/movies/update_movie', {...state})
			 .then(() => {
				 this.setState({
					 id          : '',
					 title       : '',
					 director    : '',
					 actors      : '',
					 writer      : '',
					 studio      : '',
					 description : '',
					 duration_min: '',
					 genre       : '',
					 mpaa        : '',
					 tagline     : '',
					 release_date: '',
					 imdb_rating : '',
					 poster_pic  : '',
					 banner_pic  : '',
					 on_screen   : ''
				 });
				 toast.success('SAVED', {autoClose: 3000});
				 setTimeout(() => this.props.history.push('/admin/movie'), 3100);
			 })
			 .catch((err) => {
				 toast.error(err.message, {autoClose: 3000});
			 });
	}

	componentWillMount() {
		const {movie_id} = this.props.match.params;

		this.props.updateCurrentMovieInfo(movie_id);
	}

	componentWillReceiveProps(nextProps) {
		const {
				  id, title, director, actors, writer,
				  studio, description, duration_min,
				  genre, mpaa, tagline, release_date,
				  imdb_rating, poster_pic, banner_pic, on_screen
			  } = nextProps.currentMovieInfo;

		const options = {day: 'numeric', month: 'long', year: 'numeric'};

		this.setState({
			id, title, director, writer,
			studio, description, duration_min,
			genre, mpaa, tagline, imdb_rating,
			poster_pic, banner_pic, on_screen, actors,
			release_date: new Date(release_date).toLocaleDateString("en-US", options),
		});
	}

	render() {
		const {
				  title, director, actors, writer, studio,
				  description, duration_min, genre, mpaa,
				  tagline, release_date, imdb_rating,
				  poster_pic, banner_pic
			  } = this.state;

		return (
			<div className="add-movie">
				<div className="add-movie__container">
					<div>
						<p>title:</p>
						<input className="form-control" onChange={(ev) => this.handleChange(ev)} value={title}
							   type="text" name="title"/>
					</div>
					<div>
						<p>director:</p>
						<input className="form-control" onChange={(ev) => this.handleChange(ev)} value={director}
							   type="text"
							   name="director"/>
					</div>
					<div>
						<p>studio:</p>
						<input className="form-control" onChange={(ev) => this.handleChange(ev)} value={studio}
							   type="text" name="studio"/>
					</div>
					<div>
						<p>writer:</p>
						<input className="form-control" onChange={(ev) => this.handleChange(ev)} value={writer}
							   type="text" name="writer"/>
					</div>
					<div>
						<p>cast:</p>
						<textarea className="form-control" onChange={(ev) => this.handleChange(ev)} value={actors}
								  type="text" name="cast"/></div>
					<div>
						<p>description:</p>
						<textarea className="form-control" onChange={(ev) => this.handleChange(ev)} value={description}
								  type="text"
								  name="description"/>
					</div>
					<div>
						<p>duration in minutes:</p>
						<input className="form-control" onChange={(ev) => this.handleChange(ev)} value={duration_min}
							   type="text"
							   name="duration_min"/></div>
					<div>
						<p>genre:</p>
						<input className="form-control" onChange={(ev) => this.handleChange(ev)} value={genre}
							   type="text" name="genre"/>
					</div>
					<div>
						<p>mpaa:</p>
						<input className="form-control" onChange={(ev) => this.handleChange(ev)} value={mpaa}
							   type="text" name="mpaa"/></div>
					<div>
						<p>tagline:</p>
						<input className="form-control" onChange={(ev) => this.handleChange(ev)} value={tagline}
							   type="text" name="tagline"/>
					</div>
					<div>
						<p>realease date:</p>
						<input className="form-control" onChange={(ev) => this.handleChange(ev)} value={release_date}
							   type="text"
							   name="release_date"/></div>
					<div>
						<p>imdb rating:</p>
						<input className="form-control" onChange={(ev) => this.handleChange(ev)} value={imdb_rating}
							   type="text"
							   name="imdb_rating"/>
					</div>
					<div>
						<p>poster picture:</p>
						<input className="form-control" onChange={(ev) => this.handleChange(ev)} value={poster_pic}
							   type="text"
							   name="poster_pic"/>
					</div>
					<div>
						<p>banner picture</p>
						<input className="form-control" onChange={(ev) => this.handleChange(ev)} value={banner_pic}
							   type="text"
							   name="banner_pic"/>
					</div>
				</div>
				<div className="add-cancel-block">
					<i className="fas fa-check-circle" onClick={() => this.editMovie()}></i>
					<Link to="/admin/movie">
						<i className="fas fa-times-circle"></i>
					</Link>
				</div>
				<ToastContainer/>
			</div>
		);
	}
}

function mapStateToProps({showtimes}) {
	const {currentMovieInfo} = showtimes;

	return {currentMovieInfo};
}

export default connect(mapStateToProps, {updateCurrentMovieInfo})(EditMovie);