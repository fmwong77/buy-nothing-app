import { REPLY, REPLY_INFO } from '../constants';

const replyReducer = (state = [], action) => {
	switch (action.type) {
		case REPLY:
			return (state = action.reply);
		default:
			return state;
	}
};
export default replyReducer;
