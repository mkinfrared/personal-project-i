import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateScreenings} from '../../../../ducks/screening_reducer';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './ScreeningList.css';

class ScreeningList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: false
		};

		this.rowGenerator    = this.rowGenerator.bind(this);
		this.deleteScreening = this.deleteScreening.bind(this);

	}

	componentWillMount() {
		this.props.updateScreenings();
	}

	deleteScreening(id) {
		console.log(id);
		axios.delete(`/api/screening/${id}`)
			 .then(() => {
				 this.props.updateScreenings();
				 toast.success('DELETED', {autoClose: 3000});
			 })
			 .catch((err) => toast.error(err.message));
	}

	rowGenerator(screeningArray) {
		const screeningList = screeningArray.map((screening, index) => {
			const {id, title, name, screening_start} = screening;

			return (
				<tr key={id}>
					<td>{index + 1}</td>
					<td>{title}</td>
					<td>{name}</td>
					<td>{new Date(screening_start).toLocaleString("en-US", {
						hour12: false,
						month : '2-digit',
						day   : '2-digit',
						year  : '2-digit',
						hour  : '2-digit',
						minute: '2-digit'
					})}</td>
					<td>
						<i className="fas fa-times-circle" onClick={() => this.deleteScreening(id)}></i>
					</td>
				</tr>
			)
		});

		return screeningList;
	}

	render() {
		const {screenings} = this.props;

		return (
			<div>
				<table className="screening-list table table-hover table-striped table-dark">
					<thead className="thead-dark">
					<tr>
						<th>#</th>
						<th>Title</th>
						<th>Auditorium</th>
						<th>Date & Time</th>
					</tr>
					</thead>
					<tbody>
					{this.rowGenerator(screenings)}
					</tbody>
				</table>
				<ToastContainer/>
			</div>
		);
	}

}

function mapStateToProps({showtimes}) {
	const {screenings} = showtimes;

	return {screenings};
}

export default connect(mapStateToProps, {updateScreenings})(ScreeningList);