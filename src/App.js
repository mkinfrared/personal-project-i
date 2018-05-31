import React, {Component} from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import routes from './routes';

class App extends Component {
	render() {
		return (
			<HashRouter>
				<div className="App">
					<Nav/>
					{routes}
				</div>
			</HashRouter>
		);
	}
}

export default App;
