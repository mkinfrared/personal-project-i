import React from 'react';
import './Dots.css'

export default function Dots(props) {

	let dots = [];

	for (let i = 0; i < props.slidesCount; i++) {
		let dot = null;

		(props.currentIndex === i) ?
		dot = <i key={i}
				 className="fas fa-circle"
				 onClick={() => props.handleDotClick(i)}>
		</i> :
		dot = <i key={i}
				 className="far fa-circle"
				 onClick={() => props.handleDotClick(i)}>
		</i>;

		dots = [...dots, dot]
	}

	return (
		<div className="dots">
			{dots}
		</div>
	)
};