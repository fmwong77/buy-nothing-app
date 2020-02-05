import {
	SIGN_UP,
	SIGN_IN,
	GET_CAT,
	POST_INFO,
	SAVE_COORDINATE,
	ALL_POST,
	SIGN_OUT,
	SINGLE_POST
} from '../constants';

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

// export const userSignup = (user) => {
// 	return async (dispatch) => {
// 		const resp = await fetch('http://127.0.0.1:3000/api/v1/users/', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				Accept: 'application/json'
// 			},
// 			body: JSON.stringify({ user })
// 		});
// 		const data = await resp.json();
// 		if (data.message) {
// 			console.log('error');
// 		} else {
// 			localStorage.setItem('token', data.jwt);
// 			dispatch(signUp(data.user));
// 		}
// 	};
// };

// export const fetchPost = () => {
// 	return async (dispatch) => {
// 		const resp = await fetch('http://127.0.0.1:3000/api/v1/posts');
// 		const data = await resp.json();
// 		if (data) {
// 			return data;
// 		}
// 	};
// };
