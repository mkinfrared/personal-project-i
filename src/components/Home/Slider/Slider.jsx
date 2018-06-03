import React, {Component} from 'react';
import Slides from './Slides/Slides';
import Arrows from './Arrows/Arrows';
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
		this.timer = '';
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
		this.handleArrowClick(this.props.currentIndex);
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	handleArrowClick(num) {
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
		}, 5400);
	}

	render() {
		const {slides} = this.state;

		return (
			<div className="slider" ref="slider">
				{slides}
				<Arrows handleArrowClick={this.handleArrowClick}/>
				<i className="ion ion-md-remove-circle"></i>
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