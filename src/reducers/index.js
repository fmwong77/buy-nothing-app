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
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user', 'post']
};

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

export default persistReducer(persistConfig, allReducer);
