import React from 'react';
import { signUp, signIn } from '../actions';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import {
	Button,
	Form,
	Grid,
	Header,
	Message,
	Segment
} from 'semantic-ui-react';

function SignUp(props) {
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();

		const username = e.target.username.value;
		const password = e.target.password.value;
		const password_confirmation = e.target.password_confirmation.value;

		if (username.length === 0 || password.length === 0) {
			Swal.fire({
				title: 'Oops!',
				text: 'Username or password cannot be blank...',
				icon: 'error',
				confirmButtonText: 'Ok'
			});
		} else if (password !== password_confirmation) {
			Swal.fire({
				title: 'Oops!',
				text: 'Your password does not match...',
				icon: 'error',
				confirmButtonText: 'Ok'
			});
		} else {
			let data = {
				username: username,
				password: password,
				password_confirmation: password_confirmation
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

			fetch(
				'https://gift-away-backend.herokuapp.com/api/v1/users/',
				configObject
			)
				.then((response) => response.json())
				.then((object) => {
					if (object.user) {
						Swal.fire({
							title: `Welcome ${username}!`,
							text: 'Thank you for signing up',
							icon: 'success',
							confirmButtonText: 'Ok'
						});
						localStorage.setItem('token', object.jwt);
						dispatch(
							signUp({
								username: object.user.username
							})
						);

						dispatch(
							signIn({
								id: object.user.id,
								username: object.user.username,
								isSignedIn: true
							})
						);
						props.history.push('/');
					} else {
						Swal.fire({
							title: 'Oops!',
							text: `Username ${username} already exists! Please try another username`,
							icon: 'error',
							confirmButtonText: 'Ok'
						});
					}
				});
		}
	};

	return (
		<div className="card">
			<br></br>
			<br></br>
			<Message
				attached
				header="Welcome to our site!"
				content="Fill out the form below to sign-up for a new account"
			/>
			<Grid textAlign="center" verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as="h2" color="teal" textAlign="center">
						{/* <img src="/static/images/logo.png" alt="logo" className="image" />{' '} */}
						{/* Sign-up a new account */}
					</Header>
					<Form size="large" onSubmit={(event) => handleSubmit(event)}>
						<Segment stacked>
							<Form.Input
								fluid
								icon="user"
								iconPosition="left"
								placeholder="Username"
								name="username"
								// ref={(input) => (this.inputtext = input)}
							/>
							<Form.Input
								fluid
								icon="lock"
								iconPosition="left"
								placeholder="Password"
								type="password"
								name="password"
							/>
							<Form.Input
								fluid
								icon="lock"
								iconPosition="left"
								placeholder="Confirm Password"
								type="password"
								name="password_confirmation"
							/>
							<Button color="teal" fluid size="large" type="submit">
								Sign Up
							</Button>
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
		</div>
	);
}

export default SignUp;
