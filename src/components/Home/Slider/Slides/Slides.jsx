import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Slides.css'

function Slides(props) {
	const {banner_pic, tagline, title, id, imdb_rating} = props.movie;
	console.log(imdb_rating)
	const background = {
		backgroundImage   : `url(${banner_pic})`,
		backgroundSize    : 'cover',
		backgroundPosition: 'center',
		transform         : `translateX(${-100 * props.currentIndex}%)`
	};

	return (
		<Link to={`/movie/${id}`}>
			<div className="slides" style={background}>
				<div className="movie-title">
					<p>{title}</p>
				</div>
				<div className="tagline">
					<p className="tagline">{tagline}</p>
				</div>
			</div>
		</Link>
	);
}

function mapStateToProps({slide}) {
	const {currentIndex} = slide;

	return {currentIndex};
}

export default connect(mapStateToProps)(Slides);