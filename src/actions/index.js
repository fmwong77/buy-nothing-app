import {
	SIGN_UP,
	SIGN_IN,
	GET_CAT,
	POST_INFO,
	SAVE_COORDINATE,
	ALL_POST,
	SIGN_OUT,
	SINGLE_POST,
	ALL_COMMENTS,
	REPLY,
	REPLY_INFO
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

export const signOut = (user) => {
	return {
		type: SIGN_OUT,
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
	console.log(payload);

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
	console.log(payload);

	return {
		type: REPLY_INFO,
		payload
	};
};

export const fetchPosts = (type, user_id, category_id) => (dispatch) => {
	const token = localStorage.getItem('token');
	console.log('fetching posts');

	fetch(
		`http://localhost:3000/api/v1/posts?type=${type}&user_id=${user_id}&category_id=${category_id}`,
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
		.get(`http://localhost:3000/api/v1/comments?post_id=${post_id}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((response) => {
			if (response && response.status === 200) {
				console.log(response.data);
				dispatch(allComments(response.data));
			} else {
				console.log('Error fetching comments');
			}
		})
		.catch((error) => console.log(error.message));
};

export const fetchReplies = (comment_id) => (dispatch) => {
	console.log('fetching replies');
	console.log(comment_id);

	const token = localStorage.getItem('token');

	axios
		.get(`http://localhost:3000/api/v1/replies?comment_id=${comment_id}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((response) => {
			if (response && response.status === 200) {
				console.log(response.data);
				dispatch(reply(response.data));
			} else {
				console.log('Error fetching replies');
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

	fetch('http://127.0.0.1:3000/api/v1/comments/', configObject)
		.then((response) => response.json())
		.then((data) => {
			console.log([data]);
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

	console.log(reply.user_id);
	console.log(reply.comment_id);
	console.log(reply.content);

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

	fetch('http://127.0.0.1:3000/api/v1/replies/', configObject)
		.then((response) => response.json())
		.then((data) => {
			console.log([data]);
			if (data) {
				// const d = {
				// 	user_id: data.user_id,
				// 	comment_id: data.comment_id,
				// 	content: data.content
				// };
				// dispatch(reply([d]));
			}
		});
};

export const fetchCategories = () => (dispatch) => {
	console.log('fetching categories');
	const token = localStorage.getItem('token');

	axios
		.get('http://localhost:3000/api/v1/categories', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((response) => {
			if (response && response.status === 200) {
				console.log(response.data);
				dispatch(getCategories(response.data));
			} else {
				console.log('Error fetching categories');
			}
		})
		.catch((error) => console.log(error.message));
};
