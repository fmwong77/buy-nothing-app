import { GET_CAT } from '../constants';

const categoryReducer = (state = { categories: [] }, action) => {
	switch (action.type) {
		case GET_CAT:
			return { categories: action.categories };
		default:
			return state;
	}
};

export default categoryReducer;
