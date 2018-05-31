import React, {Component} from 'react';
import Slider from './Slider/Slider';

export default class Home extends Component {
  constructor(props) {
    super(props);

  }

	render() {
		return (
			<div className="home">
				<Slider/>
			</div>
		);
	}


}