import React from 'react';

export default function Arrows(props) {
	const {handleArrowClick, autoplay} = props;


	return (
		// TODO Ask Tommy about elemnt jumping when changing opacity
		<div className="arrows">
			<i className="ion ion-ios-arrow-dropleft-circle" onClick={() => handleArrowClick(-1)}></i>
			<i className="ion ion-ios-arrow-dropright-circle" onClick={() => handleArrowClick(1)}></i>
		</div>
	)
};