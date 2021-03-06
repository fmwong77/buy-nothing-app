import { SAVE_COORDINATE } from '../constants';

const mapReducer = (state = {}, action) => {
	switch (action.type) {
		case SAVE_COORDINATE:
			return {
				...action.coordinate
			};
		default:
			return state;
	}
};

export default mapReducer;
