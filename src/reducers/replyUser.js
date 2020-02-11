import { REPLY_USER } from '../constants';

const replyUserReducer = (state = [], action) => {
	let newState = [];

	switch (action.type) {
		case REPLY_USER:
			newState = action.payload;

			if (newState === null) return [];
			else return newState;

		default:
			return state;
	}
};

export default replyUserReducer;
