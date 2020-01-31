import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import SamplePageOne from '../components/SamplePageOne';
import SamplePageTwo from '../components/SamplePageTwo';
import SamplePageThree from '../components/SamplePageThree';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Login from '../components/Login';
import Home from '../components/Home';
import SignUp from './SignUp';
import ItemDetails from './ItemDetailsFunc';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="app">
					<NavBar />
					<Route exact path="/home" component={Home} />
					<Route exact path="/first-page" component={SamplePageOne} />
					<Route exact path="/sign-up" component={SignUp} />
					<Route exact path="/sign-in" component={Login} />
					<Route exact path="/item-details" component={ItemDetails} />
					{/* <Footer /> */}
				</div>
			</Router>
		);
	}
}

export default App;
