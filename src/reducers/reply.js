import { REPLY, REPLY_INFO } from '../constants';

const replyReducer = (state = [], action) => {
	switch (action.type) {
		case REPLY:
			return (state = action.reply);
		// case REPLY_INFO:
		// 	console.log(action.replyInfo);

		// 	return (state = action.replyInfo);
		default:
			return state;
	}
};
export default replyReducer;
