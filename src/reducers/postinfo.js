import { POST_INFO } from '../constants';

const postInfoReducer = (
	state = { category_id: null, category: '', image: null },
	action
) => {
	let newState = [];

	switch (action.type) {
		case POST_INFO:
			newState = {
				...state,
				...action.payload
			};

			return newState;

		default:
			return state;
	}
};

export default postInfoReducer;
