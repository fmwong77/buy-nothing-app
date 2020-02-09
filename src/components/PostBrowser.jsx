/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, signIn } from '../actions';
import ItemCard from './ItemCard';
import { Redirect } from 'react-router';
import Search from './Search.jsx';

const PostBrowser = (props) => {
	// todo: redirect to signIn if not signed-in
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.post);
	const user = useSelector((state) => state.user);

	useEffect(() => {
		// getPosts();
		dispatch(fetchPosts(props.type, user.id));
	}, []);

	console.log(posts);

	return (
		<div>
			<br></br>
			<br></br>
			<br></br>
			<div align="center">
				<Search type={props.type} />
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
