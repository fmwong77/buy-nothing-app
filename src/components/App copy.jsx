import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { signUp } from '../actions';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { username: '', password: '' };
	}

	signUp = (e) => {
		// e.persist();
		e.preventDefault();
		console.log(this.state);

		this.props.signUp(this.state);
	};

	handleOnChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		console.log(this.state);
	};

	render() {
		return (
			<div className="card">
				<h5 className="card-header info-color white-text text-center py-4">
					<strong>Sign Up</strong>
				</h5>
				<br></br>
				<div className="card-body px-lg-5 pt-0">
					<form
						className="text-center"
						style={{ color: '#757575' }}
						action="#!"
						onSubmit={(e) => {
							this.signUp(e);
						}}
					>
						<div className="md-form">
							<input
								type="text"
								name="username"
								className="form-control"
								placeholder="Username"
								onChange={(e) => this.handleOnChange(e)}
							></input>
							<input
								type="password"
								name="password"
								className="form-control"
								placeholder="Password"
								onChange={(e) => this.handleOnChange(e)}
							></input>
							<input
								type="password"
								name="confirmpassword"
								className="form-control"
								placeholder="Confirm Password"
							></input>
							<button className="btn btn-success" type="submit">
								Sign Up
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return { signUp: (newUser) => dispatch(signUp(newUser)) };
};

export default connect(null, mapDispatchToProps)(App);
