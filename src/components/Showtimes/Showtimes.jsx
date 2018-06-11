import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateScreenings} from '../../ducks/screening_reducer';
import {urlChange} from '../../ducks/urls_reducer';
import _ from 'lodash';
import './Showtimes.css'

class Showtimes extends Component {
	constructor(props) {
		super(props);

		this.state = {};

	}

	componentWillMount() {
		this.props.updateScreenings();
	}

	componentDidMount() {
		const {path} = this.props.match;

		this.props.urlChange(path);
	}

	componentWillReceiveProps(nextProps) {
		const groupedShowtimes = _.groupBy(nextProps.screenings, (elem) => {
			return new Date(elem.screening_start).toLocaleDateString("en-US", {month: 'long', day: 'numeric'});
		});

		let showtimesDisplay = [];

		for (const key in groupedShowtimes) {
			let display = _.groupBy(groupedShowtimes[key], (elem) => {
				return elem.title;
			});

			const options = {hour: '2-digit', minute: '2-digit'};
			let a         = [];

			for (const displayKey in display) {
				const showObj = display[displayKey];

				const style = {
					backgroundImage: `url("${showObj[0].poster_pic}")`,
					filter         : 'blur(8px)',
					// filter         : 'brightness(60%)',
					// opacity        : '0.9',
					width          : '110%',
					height         : '470px',
					position       : 'absolute',
					zIndex         : '-1',
					left           : '-10px',
					top            : '-10px'
				};

				let auditoriumName = Object.keys(_.groupBy(display[displayKey], 'name'));

				a = [...a,
					 <div className="showtime-card" key={showObj[0].movie_id}>
						 <div className="showtime-poster">
							 <div className="background-poster" style={style}></div>
							 <img src={showObj[0].poster_pic} alt=""/>
						 </div>
						 <div className="showtime-info">
							 <h4>{showObj[0].title}</h4>
							 <hr/>
							 <div>
								 {auditoriumName.map((audName) => {
									 return (
										 <ul key={audName}>
											 <p>{audName}:</p>
											 {showObj.map((elem) => {
												 return (elem.name === audName)
														? <Link key={elem.id} to={`/showtimes/${elem.id}`}>
															<li>
																{new Date(elem.screening_start).toLocaleTimeString("en-US", options)}
															</li>
														</Link>
														: null;
											 })}
										 </ul>
									 );
								 })}
							 </div>
						 </div>
					 </div>
				]
			}
			showtimesDisplay.push(
				<div key={key}>
					<h3>{key}</h3>
					<hr/>
					{a}
				</div>
			);
		}

		this.setState({showtimesDisplay});

	}


	render() {
		return (
			<div className="showtimes">
				<h2>Showtimes</h2>
				{this.state.showtimesDisplay}
			</div>
		);
	}

}

function mapStateToProps({showtimes}) {
	const {screenings} = showtimes;

	return {screenings};
}

export default connect(mapStateToProps, {
	updateScreenings,
	urlChange
})(Showtimes)