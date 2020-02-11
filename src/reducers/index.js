import counterReducer from './counter';
import userReducer from './user';
import categoryReducer from './category';
import { combineReducers } from 'redux';
import postReducer from './post';
import mapReducer from './map';
import postInfoReducer from './postinfo';
import commentRecuder from './comment';
import replyReducer from './reply';
import replyInfoReducer from './replyInfo';
import replyUserReducer from './replyUser';
import filterInfoReducer from './filterInfo';

const allReducer = combineReducers({
	counter: counterReducer,
	user: userReducer,
	categories: categoryReducer,
	post: postReducer,
	map: mapReducer,
	postInfo: postInfoReducer,
	comments: commentRecuder,
	reply: replyReducer,
	replyInfo: replyInfoReducer,
	replyUser: replyUserReducer,
	filterInfo: filterInfoReducer
});

export default allReducer;

// let defaultState = null;
// export default (state, action) => {
// 	switch (action.type) {
// 		case 'RESET_STATE':
// 			// detaching the reference on reset
// 			state = .deepClone(defaultState);
// 			return state;
// 		default:
// 			break;
// 	}
// 	return allReducer(state, action);
// };
