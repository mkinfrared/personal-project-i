import React, {Component} from 'react';
import axios from 'axios';
import AuditoriumOptions from '../AuditoriumOptions/AuditoriumOptions';
import MovieOptions from '../MovieOptions/MovieOptions';
import InputMoment from 'input-moment';
import moment from 'moment';
import {connect} from 'react-redux';
import {updateScreenings} from '../../../../ducks/screening_reducer';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './AddScreening.css'

class AddScreening extends Component {
	constructor(props) {
		super(props);

		this.state = {
			auditoriumsList: [],
			auditorium_id  : '',
			movie_id       : '',
			screening_start: '',
			duration_min   : '',
			m              : moment(),
			calendarActive : false
		};

		this.calendarBlock = React.createRef();

		this.handleClick            = this.handleClick.bind(this);
		this.handleMovieChange      = this.handleMovieChange.bind(this);
		this.handleAuditoriumChange = this.handleAuditoriumChange.bind(this);
		this.addScreening           = this.addScreening.bind(this);

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
		this.setState({
			m              : m,
			screening_start: new Date(m).toISOString()
		});
	};

	handleSave = () => {
		this.setState({
			screening_start: new Date(this.state.m).toISOString(),
			calendarActive : false
		});
	};

	handleMovieChange(movieInfo) {
		const [id, duration] = movieInfo.split(',');

		this.setState({
			movie_id    : id,
			duration_min: duration
		})
	}

	handleAuditoriumChange(auditoriumID) {
		this.setState({auditorium_id: auditoriumID})
	}

	addScreening() {
		const {movie_id, auditorium_id, screening_start, duration_min} = this.state;

		if (movie_id, auditorium_id, screening_start, duration_min) {
			axios.post('/api/screening/create_screening', {movie_id, auditorium_id, screening_start, duration_min})
				 .then((resp) => {
					 toast.success('ADDED TO DATABASE', {autoClose: 3000});
					 this.props.updateScreenings();
				 })
				 .catch((err) => {
					 toast.error(err.message, {autoClose: 3000});
				 });
		} else {
			toast.warn('Please check the fields', {autoClose: 3000});
		}

	}

	componentDidMount() {
		document.addEventListener('click', this.handleClick);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleClick)
	}

	componentWillMount() {
		axios.get('/api/auditorium_id/get_auditoriums')
			 .then((resp) => {
				 const data = resp.data.map((elem) => {
					 return <AuditoriumOptions key={elem.id} data={elem}/>
				 });

				 this.setState({auditoriumsList: [...data]});
			 })
			 .catch((err) => console.log(err));
	}

	render() {
		const {auditoriumsList, calendarActive} = this.state;

		return (
			<div className="add-screening">
				<select name="movie" onChange={(ev) => this.handleMovieChange(ev.target.value)}>
					<option>Choose movie</option>
					<MovieOptions/>
				</select>
				<select name="auditorium" defaultValue="RED"
						onChange={(ev) => this.handleAuditoriumChange(ev.target.value)}>
					<option>Choose Auditorium</option>
					{auditoriumsList}
				</select>
				<div ref={this.calendarBlock} className="date-time-input">
					<input type="text"
						   value={this.state.m.format('MM/DD/YYYY HH:mm')} readOnly/>
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
				<i className="fas fa-plus-circle" onClick={() => this.addScreening()}></i>
				<ToastContainer/>
			</div>
		);
	}
}

function mapStateToProps({showtimes}) {
	return {}
}

export default connect(mapStateToProps, {updateScreenings})(AddScreening)