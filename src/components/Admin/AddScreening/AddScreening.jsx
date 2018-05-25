import React, {Component} from 'react';
import axios from 'axios';
// import {connect} from 'react-redux';
// import {updateMoviesOnScreen} from '../../../ducks/screening_reducer';
import AuditoriumOptions from './AuditoriumOptions';
import MovieOptions from './MovieOptions';

export default class AddScreening extends Component {
	constructor(props) {
		super(props);
		this.state = {
			auditoriumsList: [],
			auditorium     : '',
			movie          : '',
			screeningStart : ''
		};

		// this.updateMoviesOnScreen = this.props.updateMoviesOnScreen.bind(this);
	}

	componentWillMount() {

		// this.updateMoviesOnScreen();
		axios.get('/api/auditorium/get_auditoriums')
			 .then((resp) => {
				 const data = resp.data.map((elem) => {
					 return <AuditoriumOptions key={elem.id} data={elem}/>
				 });

				 this.setState({
					 auditoriumsList: [...data]
				 });

			 })
			 .catch((err) => console.log(err));


	}

	render() {
		const {auditoriumsList} = this.state;

		// const movieOptions = this.props.moviesOnScreen.map((elem) => {
		// 	return <option key={elem.id} value={elem.id}>{elem.title}</option>
		// });

		return (
			<div className="add-screening">
				<form>
					{/*<p>Choose auditorium</p>*/}
					<select name="auditorium" defaultValue="RED">
						<option>Choose Auditorium</option>
						{auditoriumsList}
					</select>
					{/*<p>Choose movie</p>*/}
					<select name="movie">
						<option>Choose movie</option>
						{/*{movieOptions}*/}
						<MovieOptions/>
					</select>
					<input type="date"/>
					<input type="time"/>
				</form>
			</div>
		);
	}
}

// function mapStateToProps({moviesOnScreen}) {
// 	return {moviesOnScreen}
// }

// export default connect(mapStateToProps, {updateMoviesOnScreen})(AddScreening)