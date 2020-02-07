/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, signIn } from '../actions';
import ItemCard from './ItemCard';
import { Redirect } from 'react-router';
import Search from './Search';

const PostBrowser = (props) => {
	// todo: redirect to signIn if not signed-in
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.post);
	const user = useSelector((state) => state.user);

	useEffect(() => {
		// getPosts();
		dispatch(fetchPosts(props.type, user.id, 0));
	}, []);

	// const getPosts = async () => {
	// const token = localStorage.getItem('token');
	// console.log(props.type);
	// const response = await fetch(
	// 	`http://localhost:3000/api/v1/posts?type=${props.type}&user_id=${user.id}`,
	// 	{
	// 		method: 'GET',
	// 		headers: {
	// 			Authorization: `Bearer ${token}`
	// 		}
	// 	}
	// );
	// const data = await response.json();
	// console.log(data);
	// dispatch(fetchPosts(props.type, user.id));
	// };

	// return <div></div>;
	console.log(posts);

	return (
		<div>
			<br></br>
			<br></br>
			<br></br>
			<div className="ui relaxed three column grid">
				<Search />
			</div>
			<div className="ui relaxed five column grid">
				{posts.length === 0
					? null
					: posts.map((post) => <ItemCard post={post} postType={props.type} />)}
			</div>
		</div>
	);
};
export default PostBrowser;
