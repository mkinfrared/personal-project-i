import React from 'react';
import {connect} from 'react-redux';

function Slides(props) {
	const {banner_pic, tagline, title, trailer, user_rating} = props.movie;

	const background = {
		backgroundImage   : `url(${banner_pic})`,
		backgroundSize    : 'cover',
		backgroundPosition: 'center',
		transform         : `translateX(${-100 * props.currentIndex}%)`
	};

	return (
		<div className="slides" style={background}></div>
	)
}

function mapStateToProps({slide}) {
	const {currentIndex} = slide;

	return {currentIndex};
}

export default connect(mapStateToProps)(Slides);