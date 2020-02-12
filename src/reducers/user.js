import { SIGN_UP, SIGN_IN } from '../constants';

const userReducer = (state = {}, action) => {
	switch (action.type) {
		case SIGN_UP:
			return {
				...state,
				user_id: action.user.id,
				username: action.user.username,
				password: action.user.password
			};
		case SIGN_IN:
			console.log(action.user);

			return {
				...state,
				id: action.user.id,
				username: action.user.username,
				isSignedIn: action.user.isSignedIn
			};
		default:
			return state;
	}
};

export default userReducer;
