import React from 'react';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';

import {
	Button,
	Form,
	Grid,
	Header,
	// Message,
	Segment
	// Icon
} from 'semantic-ui-react';

function ChangePassword(props) {
	// const counter = useSelector((state) => state.counter);
	const user = useSelector((state) => state.user);
	// const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();

		const password = e.target.password.value;
		const password_confirmation = e.target.password_confirmation.value;

		console.log(password);
		console.log(password_confirmation);

		if (password_confirmation.length === 0 || password.length === 0) {
			swal(
				'Oops!',
				'Password or confirmation password cannot be blank...',
				'error'
			);
		} else if (password !== password_confirmation) {
			swal('Oops!', 'Your password does not match...', 'error');
		} else {
			let data = {
				password: password
			};

			const token = localStorage.getItem('token');
			const configObject = {
				method: 'PUT',
				mode: 'cors',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			};

			fetch(`http://127.0.0.1:3000/api/v1/users/${user.id}`, configObject)
				.then((response) => response.json())
				.then((object) => {
					console.log(object.user);
					if (object.user) {
						swal('', 'Your password has been changed', 'success');
						localStorage.setItem('token', object.jwt);

						props.history.push('/item-browser');
					} else {
						swal('Oops!', 'There is an error changing your password', 'error');
					}
				});
		}
	};

	return (
		<div className="card">
			<br></br>
			<br></br>
			<br></br>
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
								Submit
							</Button>
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
		</div>
	);
}

export default ChangePassword;
