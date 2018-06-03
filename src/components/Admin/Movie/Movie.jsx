import React, {Component} from 'react';
import MovieList from './MovieList/MovieList';
import axios from 'axios';

export default class Movie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: []
		}
	}

	componentWillMount() {
		axios.get()
	}


	render() {
		return (
			<div className="movie">

			</div>
		);
	}


}