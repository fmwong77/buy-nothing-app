import React from 'react';
import { signIn } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import {
	Button,
	Form,
	Grid,
	Header,
	Message,
	Segment
	// Icon
} from 'semantic-ui-react';

import '../styles/Login.css';

const Login = (props) => {
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
			// swal('Oops!', 'Username or password cannot be blank...', 'error');
		} else {
			fetch('http://localhost:3000/api/v1/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					user: {
						username,
						password
					}
				})
			})
				.then((r) => r.json())
				.then((data) => {
					if (data.user) {
						localStorage.setItem('token', data.jwt);

						dispatch(
							signIn({
								id: data.user.id,
								username: data.user.username,
								isSignedIn: true
							})
						);
						props.history.push('/post-browser');
						// props.history.push('/manage-my-post');
					} else {
						Swal.fire({
							title: 'Oops!',
							text: 'Invalid Username or Password!',
							icon: 'error',
							confirmButtonText: 'Ok'
						});
						// swal('Oops!', 'Invalid Username or Password!', 'error');
					}
				});
		}
	};

	return (
		<div className="App">
			<br></br>
			<br></br>
			<Message
				attached
				header="Welcome to our site!"
				content="Sign in for the best experience"
			/>
			<Grid textAlign="center" verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as="h2" color="teal" textAlign="center">
						{/* <img src="/static/images/logo.png" alt="logo" className="image" />{' '} */}
						{/* Sign-in to your account */}
					</Header>
					<Form size="large" onSubmit={(event) => handleSubmit(event)}>
						<Segment stacked>
							<Form.Input
								fluid
								icon="user"
								iconPosition="left"
								placeholder="Username"
								name="username"
							/>
							<Form.Input
								fluid
								icon="lock"
								iconPosition="left"
								placeholder="Password"
								type="password"
								name="password"
							/>
							<Button color="teal" fluid size="large" type="submit">
								Login
							</Button>
						</Segment>
					</Form>
					<Message>
						New to us? <Link to="/sign-up">Sign Up</Link>
					</Message>
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default Login;
