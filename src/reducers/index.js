import counterReducer from './counter';
import userReducer from './user';
import categoryReducer from './category';
import { combineReducers } from 'redux';

const allReducer = combineReducers({
	counter: counterReducer,
	user: userReducer,
	categories: categoryReducer
});

export default allReducer;
