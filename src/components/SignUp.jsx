import React from 'react';
import { signUp } from '../actions';
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

function SignUp(props) {
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
		} else if (password !== e.target.confirm_password.value) {
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

							props.history.push('/item-details');

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
			<br></br>
			<br></br>
			<br></br>
			<Grid textAlign="center" verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as="h2" color="teal" textAlign="center">
						<img src="/static/images/logo.png" alt="logo" className="image" />{' '}
						Sign-up a new account
					</Header>
					<Form size="large" onSubmit={(event) => handleSubmit(event)}>
						<Segment stacked>
							<Form.Input
								fluid
								icon="user"
								iconPosition="left"
								placeholder="Username"
								name="username"
								ref={(input) => (this.inputtext = input)}
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
								name="confirm_password"
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
