import React from 'react';
import _ from "lodash";

export default function SeatOptions(props) {
	const {currentScreening} = props;

	let seats = [];

	let seatObj = _.groupBy(currentScreening, 'row_number');

	for (const seatObjKey in seatObj) {
		const a = seatObj[seatObjKey];

		seats.push(
			<ul key={`${a[0].screening_id}` + `${a[0].row_number}`}>
				<p>{seatObjKey}</p>
				{a.map((elem) => {
					return (
						(elem.seat_id === elem.reserved_seat_id) ?
						<li key={elem.screening_id + elem.seat_id}
							value={elem.seat_id}
							className="unavailable">
							{elem.seat_number}
						</li> :
						<li key={`${elem.screening_id}` + `${elem.seat_id}`}
							value={elem.seat_id}
							className="available"
							onClick={(ev) => props.addSeatsWanted(ev.target.value, ev)}>
							{elem.seat_number}
						</li>
					)
				})}
			</ul>
		)
	}

	return (
		<div className="seat-options">
			{seats}
		</div>
	)
}