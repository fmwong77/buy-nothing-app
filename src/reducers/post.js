import { ALL_POST, SINGLE_POST, FETCH_POSTS } from '../constants';

const postReducer = (state = [], action) => {
	let newState = [];

	switch (action.type) {
		case ALL_POST:
			newState = action.post;
			return newState;
		case SINGLE_POST:
			return [action.post];
		case FETCH_POSTS:
			return state;
		default:
			return state;
	}
};

export default postReducer;
