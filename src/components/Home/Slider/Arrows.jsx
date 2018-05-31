import React from 'react';

export default function Arrows(props) {
	const {handleArrowClick} = props;


	return (
		<div className="arrows">
			<i className="ion ion-ios-arrow-dropleft-circle" onClick={() => handleArrowClick(-1)}></i>
			<i className="ion ion-ios-arrow-dropright-circle" onClick={() => handleArrowClick(1)}></i>
		</div>
	)
};