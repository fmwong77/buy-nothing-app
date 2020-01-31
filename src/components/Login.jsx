import React from 'react';
import { signIn } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';

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

		if (username.length === 0 || password.length === 0) {
			swal('Oops!', 'Username or password cannot be blank...', 'error');
		} else {
			fetch(
				`http://127.0.0.1:3000/api/v1/users?username=${username}&password=${password}`
			)
				.then((response) => response.json())
				.then((data) => {
					if (data.length > 0) {
						dispatch(
							signIn({
								username,
								password
							})
						);
						props.history.push('/item-details');
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
						<img src="/static/images/logo.png" alt="logo" className="image" />{' '}
						Sign-in to your account
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
						New to us? <a href="#root">Sign Up</a>
					</Message>
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default Login;
