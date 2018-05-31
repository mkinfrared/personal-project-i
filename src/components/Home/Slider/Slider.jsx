import React, {Component} from 'react';
import _ from 'lodash';
import Slides from './Slides';
import Arrows from './Arrows';
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

		this.handleArrowClick = this.handleArrowClick.bind(this);
		this.timer;
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
		this.handleArrowClick(1);
	}

	componentDidUpdate() {
		const {currentIndex, maxCount, changeCurrentIndex} = this.props;
		const rightArrow = this.refs.slider.lastChild.lastChild;
		// const event = new Event('autoplay');
		//
		// this.timer = setTimeout(function () {})
		// rightArrow.addEventListener('autoplay', function () {
		// 	let index = currentIndex + 1;
		// 	console.log('trigger');
		// 	if (index > maxCount) {
		// 		index = 0;
		// 	} else if (index < 0) {
		// 		index = maxCount;
		// 	}
		//
		// 	changeCurrentIndex(index);
		// });
		//
		// let timer = setTimeout(function ticker () {
		// 	console.log(`maxCount = ${maxCount}
		// 				currentIndex = ${currentIndex}`);
		// 	rightArrow.dispatchEvent(event);
		// 	timer = setTimeout(ticker, 2000);
		// }, 2000);

		// this.timer = setInterval(function ticker() {
		// 	let index = currentIndex + 1;
		//
		// 	if (index > maxCount) {
		// 		index = 0;
		// 	} else if (index < 0) {
		// 		index = maxCount;
		// 	}
		//
		// 	changeCurrentIndex(index);
		//
		// 	_.debounce(ticker, 1000);
		// }, 1000);
	}

	handleArrowClick(num, ev) {
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
			this.handleArrowClick(1)
		}, 3400);
	}

	render() {
		const {slides} = this.state;

		return (
			<div className="slider" ref="slider">
				{slides}
				<Arrows handleArrowClick={this.handleArrowClick}/>
			</div>
		);
	}

}

function mapStateToProps({screenings, slide}) {
	const {moviesOnScreen}         = screenings,
		  {maxCount, currentIndex} = slide;

	return {moviesOnScreen, maxCount, currentIndex};
}

export default connect(mapStateToProps, {
	changeMaxCount,
	updateMoviesOnScreen,
	changeCurrentIndex
})(Slider);