import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { connect } from 'react-redux';

import NavBar from './NavBar';
import Login from '../components/Login';
import Home from '../components/Home';
import SignUp from './SignUp';
import PostDetails from './PostDetails';
import PostBrowser from './PostBrowser';
import ChangePassword from './ChangePassword';
import NewPost from './NewPost';
import CommentContainier from './CommentContainer';
import { signIn } from '../actions';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="app">
					<NavBar render={(routeProps) => <NavBar {...routeProps} />} />
					<Route exact path="/" component={Home} />
					<Route exact path="/sign-up" component={SignUp} />
					<Route exact path="/sign-in" component={Login} />
					<Route
						exact
						path="/post-details/:id"
						render={(props) => <PostDetails {...props} />}
					></Route>
					<Route exact path="/new-post">
						{!this.props.isSignedIn ? (
							<Redirect to="/sign-in?redirect=new-post" />
						) : (
							<NewPost />
						)}
					</Route>
					<Route exact path="/post-browser">
						{!this.props.isSignedIn ? (
							<Redirect to="/sign-in?redirect=new-post" />
						) : (
							<PostBrowser type="view" />
						)}
					</Route>
					<Route
						exact
						path="/comments/:id"
						component={(props) => <CommentContainier {...props} />}
					></Route>
					<Route exact path="/manage-my-post">
						{this.props.isSignedIn ? (
							<PostBrowser type={'manage'} />
						) : (
							<Redirect to="/sign-in" />
						)}
					</Route>
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
	return {
		isSignedIn: state.user.isSignedIn,
		username: state.user.username,
		id: state.user.id
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (user) => {
			dispatch(signIn(user));
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
