import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import axios from 'axios';
import {connect} from 'react-redux';
import {urlChange} from '../../ducks/urls_reducer';
import './TopSellers.css'

class TopSellers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				labels  : [],
				datasets: [],
				label   : ''
			}
		}
	}

	componentWillMount() {
		this.props.urlChange();

		axios.get('/api/sales')
			 .then((resp) => {
				 const datasets = [{
					 data           : [],
					 label          : 'Tickets sold last week',
					 backgroundColor: ['rgba(255, 99, 132, 0.2)',
									   'rgba(54, 162, 235, 0.2)',
									   'rgba(255, 206, 86, 0.2)',
									   'rgba(75, 192, 192, 0.2)',
									   'rgba(153, 102, 255, 0.2)',
									   'rgba(255, 159, 64, 0.2)'],
					 borderColor    : ['rgba(255,99,132,1)',
									   'rgba(54, 162, 235, 1)',
									   'rgba(255, 206, 86, 1)',
									   'rgba(75, 192, 192, 1)',
									   'rgba(153, 102, 255, 1)',
									   'rgba(255, 159, 64, 1)'],
					 borderWidth    : 1
				 }];

				 resp.data.forEach((elem) => {
					 datasets[0].data.push(elem.total_tickets_sold);
				 });

				 const labels = resp.data.map((elem) => elem.title);

				 this.setState({
					 data: {
						 labels  : [...labels],
						 datasets: [...datasets]
					 }
				 });
			 })
			 .catch((err) => console.error(err));
	}

	render() {
		console.log(this.state);
		return (
			<div className="top-sellers">
				<Doughnut
					data={this.state.data}
				/>
			</div>
		);
	}

}

function mapStateToProps() {
	return {}
}

export default connect(mapStateToProps, {urlChange})(TopSellers);