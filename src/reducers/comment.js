import { ALL_COMMENTS } from '../constants';

const commentReducer = (state = [], action) => {
	switch (action.type) {
		case ALL_COMMENTS:
			console.log(action.comments);

			return (state = action.comments);
		default:
			return state;
	}
};
export default commentReducer;
