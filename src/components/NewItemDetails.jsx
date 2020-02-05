/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Grid, Card, Image, Message } from 'semantic-ui-react';
import { getCategories, newPost, singlePost, saveCoordinate } from '../actions';
import Map from './Map';
import swal from 'sweetalert';
import { DirectUpload } from 'activestorage';

const ItemDetails = (props) => {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories);
	const post = useSelector((state) => state.post);
	const new_post = useSelector((state) => state.newPost);
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
		console.log(data);

		dispatch(getCategories(data));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const title = e.target.title.value;
		const description = e.target.description.value;

		if (title.length === 0 || description.length === 0) {
			swal('Oops!', 'Title or description cannot be blank...', 'error');
		}
		console.log(post);
		// debugger;
		let data = {
			title: title,
			description: description,
			category_id: new_post[0].category_id,
			user_id: user.id,
			latitude: coordinate.lat,
			longitude: coordinate.lng,
			image: new_post[0].image
		};
		console.log(data);

		const token = localStorage.getItem('token');

		if (post[0] === undefined) {
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

			fetch('http://127.0.0.1:3000/api/v1/posts/', configObject)
				.then((response) => response.json())
				.then((object) => {
					console.log(object);
					console.log(object.id);

					if (object) {
						uploadFile(new_post[0].image, object.id);
					}
				});
		} else {
			const configObject = {
				method: 'PATCH',
				mode: 'cors',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			};

			fetch(`http://127.0.0.1:3000/api/v1/posts/${post[0].id}`, configObject)
				.then((response) => response.json())
				.then((object) => {
					console.log(object);

					if (object) {
						uploadFile(new_post[0].image, object.id);
					}
				});
		}
	};

	const uploadFile = (file, postId) => {
		console.log(file);
		console.log(postId);

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
					.then((result) => console.log(result));
			}
		});
	};

	const handleOnChange = (e) => {
		if (e.target.type === 'file') {
			dispatch(newPost({ image: e.target.files[0] }));
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
								dispatch(newPost({ category_id: value }))
							}
						/>
						<label>Files</label>
						<input
							type="file"
							multiple
							name="image_files"
							onChange={(e) => handleOnChange(e)}
							// defaultValue={post[0].image.name}
						/>

						<div style={{ margin: '100px' }}>
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

export default ItemDetails;
