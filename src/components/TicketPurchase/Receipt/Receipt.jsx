import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './Receipt.css'

class Receipt extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name           : '',
			reservation_id : '',
			title          : '',
			screening_start: '',
			ticketInfo     : []
		};
	}

	componentWillMount() {
		const {reservation} = this.props;

		axios.get(`/api/ticket/${reservation}`)
			 .then((ticketInfo) => {
					 const {name, reservation_id, title, screening_start} = ticketInfo.data[0];

					 this.setState({
						 name,
						 reservation_id,
						 title,
						 screening_start,
						 ticketInfo: ticketInfo.data
					 });
				 }
			 )
			 .catch((err) => console.log(err));
	}

	render() {
		const {name, reservation_id, title, screening_start, ticketInfo} = this.state;

		const seatInfo = ticketInfo.map((elem, i) => {
			return (
				<div key={elem.reservation_id}>
					<p>Row: {elem.row} Seat: {elem.number}</p>
				</div>
			)
		});

		return (
			<div className="receipt">
				<h2>YOUR RECEIPT #{reservation_id}</h2>
				<h3>{title}</h3>
				<h3>{new Date(screening_start).toLocaleString("en-US")}</h3>
				<h3>Auditorium: {name}</h3>
				{seatInfo}
			</div>
		)

	}

}

function mapStateToProps({showtimes}) {
	const {reservation} = showtimes;

	return {reservation};
}

export default connect(mapStateToProps)(Receipt)