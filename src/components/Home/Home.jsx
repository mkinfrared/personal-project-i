import React, {Component} from 'react';
import Slider from './Slider/Slider';
import TodayScreen from './TodayScreen/TodayScreen';

export default class Home extends Component {
  constructor(props) {
    super(props);

  }

	render() {
		return (
			<div className="home">
				<Slider/>
				{/*<TodayScreen/>*/}
			</div>
		);
	}


}