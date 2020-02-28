import React from 'react';
import { signIn } from '../actions';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { Message } from 'semantic-ui-react';

function SignIn() {
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();

		const username = e.target.username.value;
		const password = e.target.password.value;

		if (username.length === 0 || password.length === 0) {
			Swal.fire({
				title: 'Oops!',
				text: 'Username or password cannot be blank...',
				icon: 'error',
				confirmButtonText: 'Ok'
			});
		} else {
			fetch(
				`http://localhost:3000/api/v1/users?username=${username}&password=${password}`
			)
				.then((response) => response.json())
				.then((data) => {
					if (data.length > 0) {
						const id = data[0].id;
						dispatch(
							signIn({
								id,
								username
							})
						);
						localStorage.setItem('token', data.jwt);
						localStorage.setItem('userId', id);
					} else {
						Swal.fire({
							title: 'Oops!',
							text: 'Invalid Username or Password!',
							icon: 'error',
							confirmButtonText: 'Ok'
						});
					}
				});
		}
	};

	return (
		<div className="card">
			<Message
				attached
				header="Welcome to our site!"
				content="Sign in for the best experience"
			/>
			<h5 className="card-header info-color white-text text-center py-4">
				<strong>Sign In</strong>
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
						></input>
						<input
							type="password"
							name="password"
							className="form-control"
							placeholder="Password"
						></input>
						<button className="btn btn-success" type="submit">
							Sign In
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default SignIn;
