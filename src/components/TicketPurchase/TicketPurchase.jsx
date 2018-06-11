import React, {Component} from 'react';
import axios from 'axios';
import SeatOptions from './SeatOptions/SeatOptions';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import {updateCurrentScreening, updateReservation} from '../../ducks/screening_reducer';
import './TicketPurchase.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class TicketPurchase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			seatsWanted: [],
			price      : 12,
		};

		this.addSeatsWanted = this.addSeatsWanted.bind(this);
		this.buyTickets     = this.buyTickets.bind(this);
		// this.onToken        = this.onToken.bind(this);

	}

	componentWillMount() {
		const {screening_id} = this.props.match.params;

		this.props.updateCurrentScreening(screening_id);
	}

	componentWillReceiveProps(nextProps) {
		const {currentScreening} = nextProps;


		this.setState({currentScreening});

	}

	addSeatsWanted(seatID, ev) {
		const {seatsWanted} = this.state,
			  a             = seatsWanted.indexOf(seatID);

		if (!this.props.user) {
			alert('Please login');
			return;
		}

		if (a + 1) {
			seatsWanted.splice(a, 1);
			this.setState({seatsWanted});
			ev.target.classList.remove('reserved');
			ev.target.classList.add('available');
		} else {
			seatsWanted.push(seatID);
			this.setState({seatsWanted});
			ev.target.classList.remove('available');
			ev.target.classList.add('reserved');
		}

	}

	onToken = (token) => {
		const {price, seatsWanted} = this.state,
			  {screening_id}       = this.props.match.params;

		const amount = price * seatsWanted.length;

		token.card = void 0;
		axios.post('/api/payment', {
			token,
			amount: amount /* the amount actually charged*/
		})
			 .then(() => {
				 console.log('CHARGE');
				 axios.post(`/api/seat/reserve/${screening_id}`, {seatsWanted})
					  .then((resp) => {
						  this.props.updateReservation(resp.data[0].reservation_id);
						  this.props.history.push(`/receipt/payment-success`)
					  })
					  .catch((err) => console.dir(err));
			 })
			 .catch((err) => console.log(err));
	};

	buyTickets() {
		const {seatsWanted}  = this.state,
			  {screening_id} = this.props.match.params;


	}

	render() {
		const {currentScreening, seatsWanted, price} = this.state;
		const {screening_id}                         = this.props.currentScreening[0] || {};

		const amount = price * seatsWanted.length;

		const options = {
			year  : 'numeric',
			month : 'long',
			day   : 'numeric',
			hour  : '2-digit',
			minute: '2-digit'
		};

		return (
			<div className="ticket-purchase">
				<div className="screening-info">
					<h2>{(currentScreening) ? currentScreening[0].movie_title : null}</h2>
					<h3>{(currentScreening)
						 ? new Date(currentScreening[0].screening_start).toLocaleDateString("en-US", options)
						 : null}
					</h3>
					<div className="seat-options-wrapper">
						<SeatOptions currentScreening={currentScreening}
									 addSeatsWanted={this.addSeatsWanted}/>
					</div>
				</div>
				<div className="payment-container">
					<p>Total: ${amount}</p>
					<StripeCheckout token={this.onToken}
									stripeKey={'pk_test_wBkuXuLvbwt2XNQFdNXNNqeb'}/>
				</div>
				<ToastContainer/>
			</div>
		);
	}

}

function mapStateToProps({showtimes, users}) {
	const {currentScreening} = showtimes,
		  {user}             = users;

	return {currentScreening, user};
}

export default connect(mapStateToProps, {
	updateCurrentScreening,
	updateReservation
})(TicketPurchase);