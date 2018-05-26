import React, {Component} from 'react';
import axios from 'axios';
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
	}

	componentWillMount() {
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

		return (
			<div className="add-screening">
				<form action={}>
					<select name="auditorium" defaultValue="RED">
						<option>Choose Auditorium</option>
						{auditoriumsList}
					</select>
					<select name="movie">
						<option>Choose movie</option>
						<MovieOptions/>
					</select>
					<input type="datetime-local"/>
				</form>
			</div>
		);
	}
}