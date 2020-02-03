import React from 'react';
import { signIn } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';

function SignIn() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		console.log(e.target.username.value);
		e.preventDefault();

		const username = e.target.username.value;
		const password = e.target.password.value;

		if (username.length === 0 || password.length === 0) {
			swal('Oops!', 'Username or password cannot be blank...', 'error');
		} else {
			fetch(
				`http://127.0.0.1:3000/api/v1/users?username=${username}&password=${password}`
			)
				.then((response) => response.json())
				.then((data) => {
					if (data.length > 0) {
						const user_id = data[0].id;
						dispatch(
							signIn({
								user_id,
								username
							})
						);
						localStorage.setItem('token', data.jwt);
						// this.props.history.push('/');
					} else {
						swal('Oops!', 'Invalid Username or Password!', 'error');
					}
				});
		}
	};

	return (
		<div className="card">
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
