import React, {Component} from 'react';
import axios from 'axios';
import AuditoriumOptions from '../AuditoriumOptions/AuditoriumOptions';
import MovieOptions from '../MovieOptions/MovieOptions';
import InputMoment from 'input-moment';
import moment from 'moment';
import './AddScreening.css'

export default class AddScreening extends Component {
	constructor(props) {
		super(props);

		this.state = {
			auditoriumsList: [],
			auditorium     : '',
			movie          : '',
			screeningStart : '',
			m              : moment(),
			calendarActive : false
		};

		this.calendarBlock = React.createRef();

		this.handleClick = this.handleClick.bind(this);

	}

	handleClick(ev) {
		const node = this.calendarBlock.current;

		if (node.contains(ev.target)) {
			this.setState({calendarActive: true})
		} else {
			this.setState({calendarActive: false})
		}

	}

	handleChange = m => {
		this.setState({m});
	};

	handleSave = () => {
		console.log('saved', this.state.m.format('llll'));
	};

	componentDidMount() {
		document.addEventListener('click', this.handleClick);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleClick)
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
		const {auditoriumsList, calendarActive} = this.state;

		return (
			<div className="add-screening">
				<select name="movie">
					<option>Choose movie</option>
					<MovieOptions/>
				</select>
				<select name="auditorium" defaultValue="RED">
					<option>Choose Auditorium</option>
					{auditoriumsList}
				</select>
				<div ref={this.calendarBlock} className="date-time-input">
					<input type="text"
						   value={this.state.m.format('MM/DD/YYYY HH:MM')} readOnly/>
					{(calendarActive) ? <InputMoment
						moment={this.state.m}
						onChange={this.handleChange}
						onSave={this.handleSave}
						minStep={5} // default
						hourStep={1} // default
						prevMonthIcon="ion-ios-arrow-left" // default
						nextMonthIcon="ion-ios-arrow-right" // default
					/> : null}
				</div>
				<i className="ion ion-md-add-circle"></i>
			</div>
		);
	}
}