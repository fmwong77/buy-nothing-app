import {
	SIGN_UP,
	SIGN_IN,
	GET_CAT,
	POST_INFO,
	SAVE_COORDINATE,
	ALL_POST,
	SINGLE_POST,
	ALL_COMMENTS,
	REPLY,
	REPLY_INFO,
	REPLY_USER,
	FILTER_INFO
} from '../constants';
import axios from 'axios';

export const signUp = (user) => {
	return {
		type: SIGN_UP,
		user
	};
};

export const signIn = (user) => {
	return {
		type: SIGN_IN,
		user
	};
};

export const getCategories = (categories) => {
	return {
		type: GET_CAT,
		categories
	};
};

export const postInfo = (payload) => {
	return {
		type: POST_INFO,
		payload
	};
};

export const saveCoordinate = (coordinate) => {
	return {
		type: SAVE_COORDINATE,
		coordinate
	};
};

export const allPosts = (post) => {
	return {
		type: ALL_POST,
		post
	};
};

export const singlePost = (post) => {
	return {
		type: SINGLE_POST,
		post
	};
};

export const allComments = (comments) => {
	return {
		type: ALL_COMMENTS,
		comments
	};
};

export const reply = (reply) => {
	return {
		type: REPLY,
		reply
	};
};

export const replyInfo = (payload) => {
	return {
		type: REPLY_INFO,
		payload
	};
};

export const filterInfo = (payload) => {
	return {
		type: FILTER_INFO,
		payload
	};
};

export const replyUser = (payload) => {
	return {
		type: REPLY_USER,
		payload
	};
};

export const fetchPosts = (type, user_id) => (dispatch) => {
	const token = localStorage.getItem('token');
	console.log('fetching posts');

	fetch(
		`https://gift-away-backend.herokuapp.com/api/v1/posts?type=${type}&user_id=${user_id}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	)
		.then((response) => response.json())
		.then((data) => dispatch(allPosts(data)));
};

export const fetchComments = (post_id) => (dispatch) => {
	console.log('fetching comments');
	const token = localStorage.getItem('token');

	axios
		.get(
			`https://gift-away-backend.herokuapp.com/api/v1/comments?post_id=${post_id}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)
		.then((response) => {
			if (response && response.status === 200) {
				dispatch(allComments(response.data));
			} else {
				console.log('Error fetching comments');
			}
		})
		.catch((error) => console.log(error.message));
};

export const fetchUserProfile = () => (dispatch) => {
	console.log('fetching user');

	if (localStorage.token) {
		const token = localStorage.getItem('token');
		axios
			.get(`https://gift-away-backend.herokuapp.com//api/v1/profile`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				if (response) {
					dispatch(
						signIn({
							id: response.data.user.id,
							username: response.data.user.username,
							isSignedIn: true
						})
					);
					localStorage.setItem('userId', response.data.user.id);
				} else {
					console.log('Error fetching user');
				}
			})
			.catch((error) => console.log(error.message));
	}
};

export const fetchReplies = (comment_id) => (dispatch) => {
	console.log('fetching replies');

	const token = localStorage.getItem('token');

	axios
		.get(
			`https://gift-away-backend.herokuapp.com/api/v1/replies?comment_id=${comment_id}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)
		.then((response) => {
			if (response && response.status === 200) {
				dispatch(reply(response.data));
			} else {
				console.log('Error fetching replies');
			}
		})
		.catch((error) => console.log(error.message));
};

export const fetchReplyUser = (user_id) => (dispatch) => {
	console.log('fetching replies user');

	const token = localStorage.getItem('token');

	axios
		.get(`https://gift-away-backend.herokuapp.com/api/v1/users/${user_id}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((response) => {
			if (response && response.status === 200) {
				dispatch(replyUser(response.data));
			} else {
				console.log('Error fetching replies user');
			}
		})
		.catch((error) => console.log(error.message));
};

export const postComment = (post_id, user_id, content) => (dispatch) => {
	const token = localStorage.getItem('token');
	let data = {
		user_id: user_id,
		post_id: post_id,
		content: content
	};

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

	fetch(
		'https://gift-away-backend.herokuapp.com/api/v1/comments/',
		configObject
	)
		.then((response) => response.json())
		.then((data) => {
			if (data) {
				dispatch(allComments(data));
			}
		});
};

export const postReply = (reply) => (dispatch) => {
	const token = localStorage.getItem('token');
	let data = {
		user_id: reply.user_id,
		comment_id: reply.comment_id,
		content: reply.content
	};

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

	fetch('https://gift-away-backend.herokuapp.com/api/v1/replies/', configObject)
		.then((response) => response.json())
		.then((data) => {
			if (data) {
			}
		});
};

export const fetchCategories = () => (dispatch) => {
	console.log('fetching categories');
	const token = localStorage.getItem('token');

	axios
		.get('https://gift-away-backend.herokuapp.com/api/v1/categories', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((response) => {
			if (response && response.status === 200) {
				dispatch(getCategories(response.data));
			} else {
				console.log('Error fetching categories');
			}
		})
		.catch((error) => console.log(error.message));
};
