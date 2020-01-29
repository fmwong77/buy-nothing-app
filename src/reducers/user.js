import { SIGN_UP, SIGN_IN } from '../constants';

const userReducer = (state = {}, action) => {
	switch (action.type) {
		case SIGN_UP:
			return {
				...state,
				username: action.user.username,
				password: action.user.password
			};
		case SIGN_IN:
			console.log(action);
			return {
				...state,
				username: action.user.username,
				password: action.user.password
			};
		default:
			return state;
	}
};

export default userReducer;
