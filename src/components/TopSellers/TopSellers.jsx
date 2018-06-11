import React, {Component} from 'react';
import {Doughnut, Bar} from 'react-chartjs-2';
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
					 label          : ['batman', 'avengers'],
					 backgroundColor: ['rgba(5,142,217, 0.7)',
									   'rgba(255,191,0, 0.7)',
									   'rgba(115,25,99, 0.7)',
									   'rgba(73,163,13, 0.7)',
									   'rgba(232,63,111, 0.7)',
									   'rgba(255,76,0, 0.7)'],
					 borderColor    : ['rgba(5,142,217,1)',
									   'rgba(255,191,0, 1)',
									   'rgba(115,25,99, 1)',
									   'rgba(73,163,13, 1)',
									   'rgba(232,63,111, 1)',
									   'rgba(255,76,0, 1)'],
					 borderWidth    : 1
				 }];

				 resp.data
					 .sort((a, b) => b.total_tickets_sold - a.total_tickets_sold)
					 .forEach((elem) => {
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
				<h2>Most popular movies this week</h2>
				<div className="chart">
					<Bar
						data={this.state.data}
						options={{
							legend             : {display: false},
							responsive         : true,
							maintainAspectRatio: false,
							scales             : {
								yAxes: [{
									ticks: {
										beginAtZero: true
									}
								}]
							}
						}}
					/>
				</div>
			</div>
		);
	}

}

function mapStateToProps() {
	return {}
}

export default connect(mapStateToProps, {urlChange})(TopSellers);