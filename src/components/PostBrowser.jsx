/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, signIn, allPosts } from '../actions';
import ItemCard from './ItemCard';
import { Redirect } from 'react-router';
import Search from './Search.jsx';

const PostBrowser = (props) => {
	// todo: redirect to signIn if not signed-in
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.post);
	const user = useSelector((state) => state.user);
	const filterInfo = useSelector((state) => state.filterInfo);
	console.log(user.id);

	useEffect(() => {
		// getPosts();
		// dispatch(fetchPosts(props.type, user.id));
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
				if (filterInfo.category_id) {
					console.log(filterInfo.category_id);

					const filteredPost = data.filter(
						(post) => post.category_id === filterInfo.category_id
					);
					dispatch(allPosts(filteredPost));
				}
			});
	}, []);

	return (
		<div>
			<br></br>
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
