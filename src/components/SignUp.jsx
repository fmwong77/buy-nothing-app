import React from 'react';
import { signUp } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';

function SignUp() {
	const counter = useSelector((state) => state.counter);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		console.log(e.target.username.value);
		e.preventDefault();

		const username = e.target.username.value;
		const password = e.target.password.value;

		if (username.length === 0 || password.length === 0) {
			swal('Oops!', 'Username or password cannot be blank...', 'error');
		} else if (password !== e.target.confirmpassword.value) {
			swal('Oops!', 'Your password does not match...', 'error');
		} else {
			let data = {
				username,
				password
			};

			const configObject = {
				method: 'POST',
				mode: 'cors',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			};

			fetch('http://127.0.0.1:3000/api/v1/users/', configObject)
				.then((response) => response.json())
				.then((object) => {
					switch (object.message) {
						case 'User created':
							swal(
								`Welcome ${username}!`,
								'Thank you for signing up',
								'success'
							);

							// this.props.history.push('/');
							break;
						case 'User already exists':
							swal(
								'Oops!',
								`Username ${username} already exists! Please try another username`,
								'error'
							);
							break;
						default:
					}
				});
		}

		dispatch(
			signUp({
				username: e.target.username.value,
				password: e.target.password.value
			})
		);
	};

	return (
		<div className="card">
			<h5 className="card-header info-color white-text text-center py-4">
				<strong>Sign Up...</strong>
			</h5>
			<br></br>
			<div className="card-body px-lg-5 pt-0">
				<form
					className="text-center"
					style={{ color: '#757575' }}
					action="#!"
					onSubmit={(event) => handleSubmit(event)}
				>
					<div className="md-form">
						<input
							type="text"
							name="username"
							className="form-control"
							placeholder="Username"
							// onChange={(e) => handleOnChange(e)}
						></input>
						<input
							type="password"
							name="password"
							className="form-control"
							placeholder="Password"
							// onChange={(e) => this.handleOnChange(e)}
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

export default SignUp;
