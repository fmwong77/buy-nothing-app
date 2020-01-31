import { GET_CAT } from '../constants';

const categoryReducer = (state = { categories: [] }, action) => {
	switch (action.type) {
		case GET_CAT:
			console.log(action);

			return { categories: action.categories };
		default:
			return state;
	}
};

export default categoryReducer;
