/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allPosts, setPostType } from '../actions';
import ItemCard from './ItemCard';
import { Grid } from 'semantic-ui-react';

const ItemBrowser = (props) => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.post);
	const user = useSelector((state) => state.user);

	useEffect(() => {
		getPosts();
	}, []);

	const getPosts = async () => {
		const token = localStorage.getItem('token');
		console.log(props.type);

		const response = await fetch(
			`http://localhost:3000/api/v1/posts?type=${props.type}&user_id=${user.id}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		);
		const data = await response.json();

		console.log(data);
		dispatch(allPosts(data));
		// dispatch(setPostType(props.type));
	};

	return (
		<div className="ui relaxed five column grid">
			{console.log(state)}
			{state.map((post) => (
				<ItemCard post={post} postType={props.type} />
			))}
		</div>
	);
};
export default ItemBrowser;
