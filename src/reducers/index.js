import counterReducer from './counter';
import userReducer from './user';
import categoryReducer from './category';
import { combineReducers } from 'redux';
import postReducer from './post';
import mapReducer from './map';
// import typeReducer from './type';

const allReducer = combineReducers({
	counter: counterReducer,
	user: userReducer,
	categories: categoryReducer,
	post: postReducer,
	map: mapReducer
	// postType: typeReducer
});

export default allReducer;
