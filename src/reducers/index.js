import counterReducer from './counter';
import userReducer from './user';
import { combineReducers } from 'redux';

const allReducer = combineReducers({
	counter: counterReducer,
	user: userReducer
});

export default allReducer;
