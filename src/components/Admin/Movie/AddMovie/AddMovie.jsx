import React, {Component} from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './AddMovie.css'

export default class AddMovie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title       : '',
			director    : '',
			cast        : '',
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
			banner_pic  : ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.addMovieToDatabase = this.addMovieToDatabase.bind(this);

	}

	handleChange(ev) {
		const {name, value} = ev.target;

		this.setState({[name]: value});
	}

	addMovieToDatabase() {
		const {state} = this;

		axios.post('/api/movie/add_movie', {...state})
			 .then(() => {
				 this.setState({
					 title       : '',
					 director    : '',
					 cast        : '',
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
					 banner_pic  : ''
				 });
				 toast.success('ADDED TO DATABASE', {autoClose: 3000});
			 })
			 .catch((err) => {
				 toast.error(err.message, {autoClose: 3000});
			 });
	}

	render() {
		const {
				  title, director, cast, writer, studio,
				  description, duration_min, genre, mpaa,
				  tagline, release_date, imdb_rating,
				  poster_pic, banner_pic
			  } = this.state;

		return (
			<div className="add-movie">
				<div className="add-movie__container">
					<div>
						<p>title:</p>
						<textarea onChange={(ev) => this.handleChange(ev)} value={title} type="text" name="title"/>
					</div>
					<div>
						<p>director:</p>
						<textarea onChange={(ev) => this.handleChange(ev)} value={director} type="text"
								  name="director"/>
					</div>
					<div>
						<p>cast:</p>
						<textarea onChange={(ev) => this.handleChange(ev)} value={cast} type="text" name="cast"/></div>
					<div>
						<p>writer:</p>
						<textarea onChange={(ev) => this.handleChange(ev)} value={writer} type="text" name="writer"/>
					</div>
					<div>
						<p>studio:</p>
						<textarea onChange={(ev) => this.handleChange(ev)} value={studio} type="text" name="studio"/>
					</div>
					<div>
						<p>description:</p>
						<textarea onChange={(ev) => this.handleChange(ev)} value={description} type="text"
								  name="description"/>
					</div>
					<div>
						<p>duration in minutes:</p>
						<textarea onChange={(ev) => this.handleChange(ev)} value={duration_min} type="text"
								  name="duration_min"/></div>
					<div>
						<p>genre:</p>
						<textarea onChange={(ev) => this.handleChange(ev)} value={genre} type="text" name="genre"/>
					</div>
					<div>
						<p>mpaa:</p>
						<textarea onChange={(ev) => this.handleChange(ev)} value={mpaa} type="text" name="mpaa"/></div>
					<div>
						<p>tagline:</p>
						<textarea onChange={(ev) => this.handleChange(ev)} value={tagline} type="text" name="tagline"/>
					</div>
					<div>
						<p>realease date:</p>
						<textarea onChange={(ev) => this.handleChange(ev)} value={release_date} type="text"
								  name="release_date"/></div>
					<div>
						<p>imdb rating:</p>
						<textarea onChange={(ev) => this.handleChange(ev)} value={imdb_rating} type="text"
								  name="imdb_rating"/>
					</div>
					<div>
						<p>poster picture:</p>
						<textarea onChange={(ev) => this.handleChange(ev)} value={poster_pic} type="text"
								  name="poster_pic"/>
					</div>
					<div>
						<p>banner picture</p>
						<textarea onChange={(ev) => this.handleChange(ev)} value={banner_pic} type="text"
								  name="banner_pic"/>
					</div>
				</div>
				<button onClick={() => this.addMovieToDatabase()}>Submit</button>
				<ToastContainer/>
			</div>
		);
	}
}