import { REPLY_INFO } from '../constants';

const replyInfoReducer = (state = [], action) => {
	let newState = [];

	switch (action.type) {
		case REPLY_INFO:
			newState = action.payload;

			if (newState === null) return [];
			else return newState;

		default:
			return state;
	}
};

export default replyInfoReducer;
