/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Grid, Card, Image, Message } from 'semantic-ui-react';
import {
	getCategories,
	postInfo,
	singlePost,
	saveCoordinate,
	fetchPosts
} from '../actions';
import Map from './Map';
import Swal from 'sweetalert2';
import { DirectUpload } from 'activestorage';

const PostDetails = (props) => {
	const dispatch = useDispatch();
	const categories = useSelector((state) => state.categories);
	// const post = useSelector((state) => state.post);
	const info = useSelector((state) => state.postInfo);
	const user = useSelector((state) => state.user);
	const coordinate = useSelector((state) => state.map);
	const token = localStorage.getItem('token');

	const [id, setId] = useState(0);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [latitude, setLatitude] = useState(30.5103116);
	const [longitude, setLongitude] = useState(-97.837184);
	const [category, setCategory] = useState('');
	const [image, setImage] = useState('');

	useEffect(() => {
		getCat();

		if (props.match.params.id) {
			getPostById();
		}
	}, []);

	const getPostById = async () => {
		const response = await fetch(
			`http://localhost:3000/api/v1/posts/${props.match.params.id}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);
		const data = await response.json();

		dispatch(singlePost(data));
		setId(data.id);
		setTitle(data.title);
		setDescription(data.description);
		setLatitude(data.latitude);
		setLongitude(data.longitude);
		dispatch(saveCoordinate({ lat: data.latitude, lng: data.longitude }));
		setImage(data.image.url);
		setCategory(data.category.category);

		dispatch(
			postInfo({
				category_id: data.category_id,
				image: data.image
			})
		);

		dispatch(
			saveCoordinate({
				lat: data.latitude,
				lng: data.longitude
			})
		);
	};

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
			// swal('Oops!', 'Title or description cannot be blank...', 'error');
			Swal.fire({
				title: 'Oops!',
				text: 'Title or description cannot be blank...',
				icon: 'error',
				confirmButtonText: 'Ok'
			});
		}

		updatePost(title, description);
		uploadFile(title, description);
		props.history.push('/manage-my-post');
	};

	const updatePost = (title, description) => {
		const token = localStorage.getItem('token');

		let data = {
			title: title,
			description: description,
			category_id: info.category_id,
			latitude: coordinate.lat,
			longitude: coordinate.lng,
			image: info.image
		};

		fetch(`http://localhost:3000/api/v1/posts/${id}?info=post`, {
			method: 'PUT',
			// mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(data)
		})
			.then((response) => response.json())
			.then((result) => {
				if (result) {
					uploadFile();
				}
			});
	};

	const uploadFile = (title, description) => {
		const token = localStorage.getItem('token');
		const upload = new DirectUpload(
			info.image,
			'http://localhost:3000/rails/active_storage/direct_uploads'
		);
		upload.create((error, blob) => {
			if (error) {
				console.log(error);
			} else {
				console.log("there's no error");

				fetch(`http://localhost:3000/api/v1/posts/${id}`, {
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

	console.log(coordinate.lat);

	console.log(coordinate.lng);

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
							<input placeholder="Title" name="title" defaultValue={title} />
						</Form.Field>
						<Form.Field>
							<label>Description</label>
							<textarea
								placeholder="Tell us more"
								rows="3"
								name="description"
								defaultValue={description}
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
							onChange={(e, { value, text }) => {
								setCategory(text);

								dispatch(
									postInfo({
										category_id: value,
										category: text
									})
								);
							}}
							text={category}
						/>
						<label>Files</label>
						<div>
							<Card>
								<Image src={image} wrapped ui={false} />
							</Card>
							<Message
								attached
								content="By uploading new image, old image will be overwritten."
							/>
						</div>
						<input
							type="file"
							multiple
							name="image_files"
							onChange={(e) => handleOnChange(e)}
							// defaultValue={post[0].image.name}
						/>

						<div style={{ margin: '100px' }}>
							<label>Pick-up Location</label>
							<Map
								// google={this.props.google}
								center={{
									lat: parseFloat(latitude),
									lng: parseFloat(longitude)
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

export default PostDetails;
