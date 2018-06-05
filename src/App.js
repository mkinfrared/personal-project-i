import React, {Component} from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import routes from './routes';

class App extends Component {
	render() {
		return (
			<HashRouter>
				<div className="App">
					<Nav/>
					{routes}
					<Footer/>
				</div>
			</HashRouter>
		);
	}
}

export default App;
