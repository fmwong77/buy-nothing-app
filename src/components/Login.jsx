import React from 'react';
import { signIn } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

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
		console.log(e.target.username.value);
		e.preventDefault();

		const username = e.target.username.value;
		const password = e.target.password.value;
		let id = 0;

		console.log(username);
		console.log(password);

		if (username.length === 0 || password.length === 0) {
			swal('Oops!', 'Username or password cannot be blank...', 'error');
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
					console.log(data);

					if (data.user) {
						localStorage.setItem('token', data.jwt);

						dispatch(
							signIn({
								id: data.user.id,
								username: data.user.username,
								isSignedIn: true
							})
						);
						props.history.push('/item-browser');
						// props.history.push('/item-details');
					} else {
						swal('Oops!', 'Invalid Username or Password!', 'error');
					}
				});
		}
	};

	return (
		<div className="App">
			<br></br>
			<br></br>
			<br></br>
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
