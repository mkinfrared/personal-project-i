import React, {Component} from 'react';
import ScreeningList from './ScreeningList/ScreeningList';
import AddScreening from './AddScreening/AddScreening';
import './Screening.css'

export default class Screening extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showtimes: []
		};
	}

	componentWillMount() {

	}


	render() {
		console.log(this.state);
		return (
			<div className="screening">
				{/*<ScreeningList screenings={this.state.showtimes}/>*/}
				<ScreeningList/>
				<AddScreening/>
			</div>
		);
	}

}