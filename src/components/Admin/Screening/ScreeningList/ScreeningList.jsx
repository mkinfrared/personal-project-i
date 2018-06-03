import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './ScreeningList.css';

export default class ScreeningList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: true
		};

		this.rowGenerator = this.rowGenerator.bind(this);

	}

	rowGenerator(screeningArray) {
		const {isEditing} = this.state;

		const screeningList = screeningArray.map((screening, index) => {
			return (
				<Link>
					<tr>
						<td>{index}</td>
						<td>{screening.title}</td>
						<td>{screening.screening_start}</td>
						<td>{screening.name}</td>
						{(isEditing) ?
							<div>
								<i className="ion ion-md-checkmark-circle"></i>
								<i className="ion ion-md-close-circle"></i>
							</div>
							:
							<div>
								<i className="ion ion-md-create"></i>
								<i className="ion ion-md-remove-circle"></i>
							</div>}
					</tr>
				</Link>
			)
		});

		return screeningList;
	}

	render() {
		const {screenings} = this.props;

		return (
			<table className="screening-list">
				<thead>
				<tr>
					<td>#</td>
					<td>Title</td>
					<td>Auditorium</td>
					<td>Date & Time</td>
				</tr>
				</thead>
				<tbody>
				{this.rowGenerator(screenings)}
				</tbody>
			</table>
		);
	}

}