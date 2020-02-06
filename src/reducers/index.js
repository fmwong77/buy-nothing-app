import counterReducer from './counter';
import userReducer from './user';
import categoryReducer from './category';
import { combineReducers } from 'redux';
import postReducer from './post';
import mapReducer from './map';
import postInfoReducer from './postinfo';
import commentRecuder from './comment';

const allReducer = combineReducers({
	counter: counterReducer,
	user: userReducer,
	categories: categoryReducer,
	post: postReducer,
	map: mapReducer,
	postInfo: postInfoReducer,
	comments: commentRecuder
});

export default allReducer;
