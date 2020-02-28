/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Grid } from 'semantic-ui-react';
import { getCategories, postInfo, fetchPosts } from '../actions';
import Map from './Map';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

import { DirectUpload } from 'activestorage';

const NewPost = (props) => {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories);
	const info = useSelector((state) => state.postInfo);
	const user = useSelector((state) => state.user);
	const coordinate = useSelector((state) => state.map);
	const token = localStorage.getItem('token');

	useEffect(() => {
		getCat();
	}, []);

	const getCat = async () => {
		const response = await fetch('http://localhost:3000/api/v1/categories', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const data = await response.json();

		dispatch(getCategories(data));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const title = e.target.title.value;
		const description = e.target.description.value;

		if (title.length === 0 || description.length === 0) {
			Swal.fire({
				title: 'Oops!',
				text: 'Title or description cannot be blank...',
				icon: 'error',
				confirmButtonText: 'Ok'
			});
		}
		// debugger;
		let data = {
			title: title,
			description: description,
			category_id: info.category_id,
			user_id: user.id,
			latitude: coordinate.lat,
			longitude: coordinate.lng
			// image: info.image
		};

		const token = localStorage.getItem('token');

		const configObject = {
			method: 'POST',
			mode: 'cors',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(data)
		};
		//gift-away-backend.herokuapp.com;
		fetch('http://localhost:3000/api/v1/posts/', configObject)
			.then((response) => response.json())
			.then((object) => {
				if (object) {
					console.log(object);
					uploadFile(info.image, object.id);
				}
			});

		props.history.push('/manage-my-post');
	};

	const uploadFile = (file, postId) => {
		const token = localStorage.getItem('token');
		const upload = new DirectUpload(
			file,
			'http://localhost:3000/rails/active_storage/direct_uploads'
		);
		upload.create((error, blob) => {
			if (error) {
				console.log(error);
			} else {
				console.log("there's no error");

				fetch(`http://localhost:3000/api/v1/posts/${postId}`, {
					method: 'PUT',
					// mode: 'cors',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
						Authorization: `Bearer ${token}`
					},
					body: JSON.stringify({ image: blob.signed_id })
				})
					.then((response) => response.json())
					.then((result) => dispatch(fetchPosts('manage', user.id)));
			}
		});
	};

	const handleOnChange = (e) => {
		if (e.target.type === 'file') {
			dispatch(postInfo({ image: e.target.files[0] }));
		}
	};

	return (
		<div className="App">
			<Grid textAlign="center" verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 850 }}>
					<br></br>
					<br></br>
					<br></br>
					<Form color="green" onSubmit={(event) => handleSubmit(event)}>
						<Form.Field>
							<label>Title</label>
							<input placeholder="Title" name="title" />
						</Form.Field>
						<Form.Field>
							<label>Description</label>
							<textarea
								placeholder="Tell us more"
								rows="3"
								name="description"
							></textarea>
						</Form.Field>
						<Form.Select
							fluid
							label="Category"
							name="category"
							options={categories.categories.map((cat) => {
								return {
									key: cat.id,
									text: cat.category,
									value: cat.id
								};
							})}
							placeholder="Select a Category"
							onChange={(e, { value }) =>
								dispatch(postInfo({ category_id: value }))
							}
						/>
						<label>Files</label>
						<input
							type="file"
							multiple
							name="image_files"
							onChange={(e) => handleOnChange(e)}
						/>

						<div style={{ margin: '100px' }}>
							<label>Pick-up Location</label>
							<Map
								// google={this.props.google}
								center={{
									lat: 30.266666,
									lng: -97.73333
								}}
								height="300px"
								zoom={15}
							/>
						</div>

						<Button color="teal" fluid size="large" type="submit">
							Save and Post
						</Button>
					</Form>
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default withRouter(NewPost);
