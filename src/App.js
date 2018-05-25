import React, {Component} from 'react';
import './App.css';
import AddMovie from './components/Admin/AddMovie/AddMovie';
import AddScreening from './components/Admin/AddScreening/AddScreening';

class App extends Component {
	render() {
		return (
			<div className="App">
				<a href={process.env.REACT_APP_LOGIN}>
					<button>Login</button>
				</a>
				<AddMovie/>
				<AddScreening/>
			</div>
		);
	}
}

export default App;
