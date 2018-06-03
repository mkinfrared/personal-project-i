import React, {Component} from 'react';
import axios from 'axios';
import ScreeningList from './ScreeningList/ScreeningList';
import AddScreening from './AddScreening/AddScreening';
import './Screening.css'

export default class Screening extends Component {
	constructor(props) {
		super(props);
		this.state = {
			screenings: []
		};
	}

	componentWillMount() {
		axios.get('/api/screenings')
			 .then((resp) => this.setState({movie: resp.data}))
			 .catch((err) => console.error(err));
	}


	render() {
		return (
			<div className="screening">
				<ScreeningList screenings={this.state.screenings}/>
				<AddScreening/>
			</div>
		);
	}


}