/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allPosts } from '../actions';
import ItemCard from './ItemCard';
import Search from './Search.jsx';

import { Message, Grid } from 'semantic-ui-react';

//create your forceUpdate hook
// const useForceUpdate = () => {
// 	const [value, setValue] = useState(0); // integer state
// 	console.log('forceUpdate');
// 	return () => setValue((value) => ++value); // update the state to force render
// };

const PostBrowser = (props) => {
	// const forceUpdate = useForceUpdate();
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.post);
	const user = useSelector((state) => state.user);
	const filterInfo = useSelector((state) => state.filterInfo);

	useEffect(() => {
		// getPosts();
		// dispatch(fetchPosts(props.type, user.id));
		console.log('useEffect');

		const token = localStorage.getItem('token');

		fetch(
			`http://localhost:3000/api/v1/posts?type=${props.type}&user_id=${user.id}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)
			.then((response) => response.json())
			.then((data) => {
				dispatch(allPosts(data));
				if (props.type === 'view') {
					if (filterInfo.category_id) {
						console.log(filterInfo.category_id);

						const filteredPost = data.filter(
							(post) => post.category_id === filterInfo.category_id
						);
						dispatch(allPosts(filteredPost));
					}
				}
			});
	}, []);

	return (
		<div>
			<br></br>
			<br></br>
			<br></br>
			<div align="center">
				{props.type === 'manage' ? (
					<Message attached header="Manage My Post" />
				) : (
					<Message attached header="View all Post" />
				)}
				<br></br>
				<Search type={props.type} />
			</div>
			<div align="center">
				<br></br>
				{posts.length === 0 && user.isSignedIn && props.type === 'manage' ? (
					<div>
						<h3>{"You don't have any post created."}</h3>
					</div>
				) : null}
				{posts.length === 0 && user.isSignedIn && props.type === 'view' ? (
					<div>
						<h3>
							{
								'No post found for this category, click on [Show All] to view all the posts.'
							}
						</h3>
					</div>
				) : null}
				{posts.length === 0 && !user.isSignedIn && props.type === 'view' ? (
					<div>
						<h3>{'You need to be signed-in to view posts.'}</h3>
					</div>
				) : null}
			</div>
			<div className="ui relaxed five column grid">
				{/* <div className="ui container four column grid"> */}
				{/* <Grid.Row columns={4}>
				<Grid.Column> */}
				{posts.map((post) => (
					<ItemCard post={post} postType={props.type} />
				))}
				{/* </Grid.Column>
			</Grid.Row> */}
			</div>
		</div>
	);
};
export default PostBrowser;
