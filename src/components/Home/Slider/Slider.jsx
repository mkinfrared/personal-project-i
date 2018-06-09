import React, {Component} from 'react';
import Slides from './Slides/Slides';
import Arrows from './Arrows/Arrows';
import Dots from './Dots/Dots';
import {connect} from 'react-redux';
import {changeMaxCount, changeCurrentIndex} from '../../../ducks/slider_reducer';
import {updateMoviesOnScreen} from '../../../ducks/screening_reducer';
import './Slider.css';

class Slider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slides: []
		};

		this.handleClick    = this.handleClick.bind(this);
		this.handleDotClick = this.handleDotClick.bind(this);
		this.timer          = '';
	}

	componentWillMount() {
		this.props.updateMoviesOnScreen();
	}

	componentWillReceiveProps(nextProps) {
		const {moviesOnScreen} = nextProps;

		const sliderArray = moviesOnScreen
			.map((movie) => <Slides key={movie.id} movie={movie}/>)
			.slice(0, 5);

		this.props.changeMaxCount(sliderArray.length - 1);

		this.setState({
			slides: [...sliderArray]
		});
	}

	componentDidMount() {
		clearTimeout(this.timer);
		this.handleClick(this.props.currentIndex);
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	handleDotClick(num) {
		clearTimeout(this.timer);
		this.props.changeCurrentIndex(num);
		this.timer = setTimeout(() => {
			this.handleClick(1)
		}, 5400);
	}

	handleClick(num) {
		clearTimeout(this.timer);

		const {currentIndex, maxCount, changeCurrentIndex} = this.props;

		let index = currentIndex + num;

		if (index > maxCount) {
			index = 0;
		} else if (index < 0) {
			index = maxCount;
		}

		changeCurrentIndex(index);


		this.timer = setTimeout(() => {
			this.handleClick(1)
		}, 5400);
	}

	render() {
		const {slides}                 = this.state;
		const {currentIndex, maxCount} = this.props;

		return (
			<div className="slider" ref="slider">
				{slides}
				<Arrows handleArrowClick={this.handleClick}/>
				<Dots slidesCount={slides.length}
					  currentIndex={currentIndex}
					  maxCount={maxCount}
					  handleDotClick={this.handleDotClick}/>
			</div>
		);
	}

}

function mapStateToProps({showtimes, slide}) {
	const {moviesOnScreen}         = showtimes,
		  {maxCount, currentIndex} = slide;

	return {moviesOnScreen, maxCount, currentIndex};
}

export default connect(mapStateToProps, {
	changeMaxCount,
	updateMoviesOnScreen,
	changeCurrentIndex
})(Slider);