import React, {Component} from 'react';
import Slider from './Slider/Slider';
import TodayScreen from './TodayScreen/TodayScreen';
import AdScreen from './AdScreen/AdScreen';
import {connect} from 'react-redux';
import {urlChange} from '../../ducks/urls_reducer';

class Home extends Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {
		const {path} = this.props.match;

		this.props.urlChange(path);
	}


	render() {
		return (
			<div className="home">
				<Slider/>
				<TodayScreen/>
				<AdScreen/>
			</div>
		);
	}
}

function mapStateToProps({url_address}) {
	return url_address;
}

export default connect(mapStateToProps, {urlChange})(Home);