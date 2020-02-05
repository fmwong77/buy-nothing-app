import { ALL_POST, SINGLE_POST } from '../constants';

const postReducer = (state = [], action) => {
	let newState = [];
	// console.log(action);
	// console.log(state);

	switch (action.type) {
		// case SAVE_POST:
		// 	// newState = {
		// 	// 	...state,
		// 	// 	...action.post
		// 	// };
		// 	if (state.length !== 0) {
		// 		if (Object.keys(state[state.length - 1]).length === 1) {
		// 			let currentObj = state[state.length - 1];
		// 			currentObj = { ...currentObj, ...action.post };
		// 			newState = [currentObj];
		// 		}
		// 	} else {
		// 		newState = [...state, action.post];
		// 	}
		// 	console.log(newState);
		// 	return newState;

		case ALL_POST:
			// newState = {
			// 	posts: action.posts
			// };

			newState = action.post;
			console.log(newState);
			return newState;
		case SINGLE_POST:
			console.log([action.post]);

			return [action.post];
		default:
			return state;
	}
};

export default postReducer;
