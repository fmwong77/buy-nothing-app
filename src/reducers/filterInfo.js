import { FILTER_INFO } from '../constants';

const filterInfoReducer = (
	state = { category_id: null, category: '' },
	action
) => {
	let newState = [];

	switch (action.type) {
		case FILTER_INFO:
			newState = {
				...state,
				...action.payload
			};

			return newState;

		default:
			return state;
	}
};

export default filterInfoReducer;
