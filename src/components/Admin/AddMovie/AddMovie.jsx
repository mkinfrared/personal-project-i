import React, {Component} from 'react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

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

		this.handleChange       = this.handleChange.bind(this);
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
				<p>title:</p>
				<input onChange={(ev) => this.handleChange(ev)} value={title} type="text" name="title"/>
				<p>director:</p>
				<input onChange={(ev) => this.handleChange(ev)} value={director} type="text" name="director"/>
				<p>cast:</p>
				<input onChange={(ev) => this.handleChange(ev)} value={cast} type="text" name="cast"/>
				<p>writer:</p>
				<input onChange={(ev) => this.handleChange(ev)} value={writer} type="text" name="writer"/>
				<p>studio:</p>
				<input onChange={(ev) => this.handleChange(ev)} value={studio} type="text" name="studio"/>
				<p>description:</p>
				<input onChange={(ev) => this.handleChange(ev)} value={description} type="text" name="description"/>
				<p>duration in minutes:</p>
				<input onChange={(ev) => this.handleChange(ev)} value={duration_min} type="text"
					   name="duration_min"/>
				<p>genre:</p>
				<input onChange={(ev) => this.handleChange(ev)} value={genre} type="text" name="genre"/>
				<p>mpaa:</p>
				<input onChange={(ev) => this.handleChange(ev)} value={mpaa} type="text" name="mpaa"/>
				<p>tagline:</p>
				<input onChange={(ev) => this.handleChange(ev)} value={tagline} type="text" name="tagline"/>
				<p>realease date:</p>
				<input onChange={(ev) => this.handleChange(ev)} value={release_date} type="text"
					   name="release_date"/>
				<p>imdb rating:</p>
				<input onChange={(ev) => this.handleChange(ev)} value={imdb_rating} type="text" name="imdb_rating"/>
				<p>poster picture:</p>
				<input onChange={(ev) => this.handleChange(ev)} value={poster_pic} type="text" name="poster_pic"/>
				<p>banner picture</p>
				<input onChange={(ev) => this.handleChange(ev)} value={banner_pic} type="text" name="banner_pic"/>
				<button onClick={() => this.addMovieToDatabase()}>Submit</button>
				<ToastContainer/>
			</div>
		);
	}
}