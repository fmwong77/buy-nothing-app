import { SIGN_UP, SIGN_IN, GET_CAT } from '../constants';

export const signUp = (user) => {
	return {
		type: SIGN_UP,
		user
	};
};

export const signIn = (user) => {
	return {
		type: SIGN_IN,
		user
	};
};

export const getCategories = (categories) => {
	return {
		type: GET_CAT,
		categories
	};
};
