import React from 'react';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

function ChangePassword(props) {
	const user = useSelector((state) => state.user);

	const handleSubmit = (e) => {
		e.preventDefault();

		const password = e.target.password.value;
		const password_confirmation = e.target.password_confirmation.value;

		if (password_confirmation.length === 0 || password.length === 0) {
			Swal.fire({
				title: 'Oops!',
				text: 'Password or confirmation password cannot be blank...',
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

			fetch(`http://localhost:3000/api/v1/users/${user.id}`, configObject)
				.then((response) => response.json())
				.then((object) => {
					if (object) {
						Swal.fire({
							title: '',
							text: 'Your password has been changed',
							icon: 'success',
							confirmButtonText: 'Ok'
						});
						localStorage.setItem('token', object.jwt);
					} else {
						Swal.fire({
							title: 'Oops!',
							text: 'There is an error changing your password',
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
