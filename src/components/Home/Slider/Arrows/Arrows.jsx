import React from 'react';
import './Arrows.css'

export default function Arrows(props) {
	const {handleArrowClick} = props;


	return (
		<div className="arrows">
			<i onClick={() => handleArrowClick(-1)} className="fas fa-chevron-left"></i>
			<i onClick={() => handleArrowClick(1)} className="fas fa-chevron-right"></i>
		</div>
	);
};