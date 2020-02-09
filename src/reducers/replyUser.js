import { REPLY_USER } from '../constants';

const replyUserReducer = (state = [], action) => {
	let newState = [];

	switch (action.type) {
		case REPLY_USER:
			newState = action.payload;
			console.log(newState);

			if (newState === null) return [];
			else return newState;

		default:
			return state;
	}
};

export default replyUserReducer;
