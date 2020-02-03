import { SAVE_POST, ALL_POST } from '../constants';

const postReducer = (state = [], action) => {
	let newState = [];
	console.log(action);
	console.log(state);
	let updatePost = {};
	switch (action.type) {
		case SAVE_POST:
			// newState = {
			// 	...state,
			// 	...action.post
			// };
			if (state.length !== 0) {
				if (Object.keys(state[state.length - 1]).length === 1) {
					let currentObj = state[state.length - 1];
					currentObj = { ...currentObj, ...action.post };
					newState = [currentObj];
				}
			} else {
				newState = [...state, action.post];
			}
			// updatePost = { action.posts }
			// newState = { ...state, ...updatePost };
			console.log(newState);
			return newState;

		case ALL_POST:
			// newState = {
			// 	posts: action.posts
			// };

			newState = action.post;
			console.log(newState);
			return newState;
		default:
			return state;
	}
};

export default postReducer;
