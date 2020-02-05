import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { connect } from 'react-redux';

import SamplePageOne from '../components/SamplePageOne';
// import SamplePageTwo from '../components/SamplePageTwo';
// import SamplePageThree from '../components/SamplePageThree';
import NavBar from './NavBar';
// import Footer from '../components/Footer';
import Login from '../components/Login';
import Home from '../components/Home';
import SignUp from './SignUp';
import ItemDetails from './PostDetails';
import PostBrowser from './PostBrowser';
import ChangePassword from './ChangePassword';
// import NewPost from './NewItemDetails';
import NewPost from './NewPost';

class App extends Component {
	render() {
		console.log(this.props.isSignedIn);
		return (
			<Router>
				<div className="app">
					<NavBar />
					<Route exact path="/" component={Home} />
					<Route exact path="/first-page" component={SamplePageOne} />
					<Route exact path="/sign-up" component={SignUp} />
					<Route exact path="/sign-in" component={Login} />
					<Route
						exact
						path="/post-details/:id"
						// component={ItemDetails}
						render={(props) => <ItemDetails {...props} />}
					>
						{/* {!this.props.isSignedIn ? (
							 
							<Redirect to="/sign-in" />
						)} */}
					</Route>
					<Route exact path="/new-post" component={NewPost}>
						{/* {!this.props.isSignedIn ? (
							 
							<Redirect to="/sign-in" />
						)} */}
					</Route>
					<Route exact path="/post-browser">
						{!this.props.isSignedIn ? (
							<Redirect to="/sign-in" />
						) : (
							<PostBrowser type={'view'} />
						)}
					</Route>
					<Route
						exact
						path="/manage-my-post"
						component={() => <PostBrowser type={'manage'} />}
					/>
					<Route exact path="/change-password">
						{this.props.isSignedIn ? (
							<ChangePassword />
						) : (
							<Redirect to="/sign-in" />
						)}
					</Route>
					{/* <Footer /> */}
				</div>
			</Router>
		);
	}
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.user.isSignedIn };
};
export default connect(mapStateToProps)(App);
