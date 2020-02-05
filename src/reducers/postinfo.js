import { POST_INFO } from '../constants';

const postInfoReducer = (
	state = { category_id: null, image: null },
	action
) => {
	let newState = [];

	switch (action.type) {
		case POST_INFO:
			// console.log(state.length);
			// console.log(state);

			// if (state.length !== 0) {
			// 	if (Object.keys(state[state.length - 1]).length === 1) {
			// 		let currentObj = state[state.length - 1];
			// 		currentObj = { ...currentObj, ...action.post };
			// 		newState = [currentObj];
			// 	}
			// } else {
			// 	newState = [action.post];
			// }
			// console.log(newState);
			// return newState;
			newState = {
				...state,
				...action.payload
			};
			console.log(newState);

			return newState;

		default:
			return state;
	}
};

export default postInfoReducer;
