import React, {Component} from 'react';
import _ from 'lodash';
import axios from 'axios';
import SeatOptions from './SeatOptions/SeatOptions';
import StripeCheckout from 'react-stripe-checkout';
import PaymentOptions from './PaymentOptions/PaymentOptions';
import {connect} from 'react-redux';
import {updateCurrentScreening} from '../../ducks/screening_reducer';
import './TicketPurchase.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class TicketPurchase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			seatsWanted: [],
			price      : 12,
			step       : 0
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
		const {price, seatsWanted} = this.state;

		const amount = price * seatsWanted.length;

		token.card = void 0;
		axios.post('/api/payment', {
			token,
			amount: amount /* the amount actually charged*/
		})
			 .then(() => this.props.history.push('/payment-success'))
			 .catch((err) => console.log(err));
	};

	buyTickets() {
		const {seatsWanted}  = this.state,
			  {screening_id} = this.props.match.params;

		axios.post(`/api/seat/reserve/${screening_id}`, {seatsWanted})
			 .then(() => {
				 toast.success('SUCCESS', {autoClose: 3000});
				 setTimeout(() => this.props.history.push('/'), 3100);
			 })
			 .catch((err) => console.dir(err));
	}

	render() {
		const {currentScreening, step} = this.state;

		const options = {
			year  : 'numeric',
			month : 'long',
			day   : 'numeric',
			hour  : '2-digit',
			minute: '2-digit'
		};
		console.log(this.props);
		return (
			<div className="ticket-purchase">
				<h2>{(currentScreening) ? currentScreening[0].movie_title : null}</h2>
				<h3>{(currentScreening)
					 ? new Date(currentScreening[0].screening_start).toLocaleDateString("en-US", options)
					 : null}
				</h3>
				{(step === 0) ?
				 <SeatOptions currentScreening={currentScreening}
							  addSeatsWanted={this.addSeatsWanted}/> :
				 <PaymentOptions/>}
				<StripeCheckout token={this.onToken} stripeKey={'pk_test_wBkuXuLvbwt2XNQFdNXNNqeb'}/>
				<ToastContainer/>
			</div>
		);
	}

}

function mapStateToProps({showtimes}) {
	const {currentScreening} = showtimes;

	return {currentScreening};
}

export default connect(mapStateToProps, {updateCurrentScreening})(TicketPurchase);