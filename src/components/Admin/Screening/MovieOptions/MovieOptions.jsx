import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateMoviesOnScreen} from '../../../../ducks/screening_reducer';

class MovieOptions extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.updateMoviesOnScreen();
	}

	render() {
		const options = this.props.moviesOnScreen.map((elem) => {
			return <option key={elem.id} value={[elem.id, elem.duration_min]}>{elem.title}</option>
		});
		return options;
	}
}

function mapStateToProps({showtimes}) {
	const {moviesOnScreen} = showtimes;

	return {moviesOnScreen};
}

export default connect(mapStateToProps, {updateMoviesOnScreen})(MovieOptions);