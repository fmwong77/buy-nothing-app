import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allReducer from '../reducers';
import { persistStore } from 'redux-persist';

const middleware = [thunk];

export const store = createStore(
	allReducer,
	{},
	applyMiddleware(...middleware)
);
export const persistor = persistStore(store);
export default { store, persistor };
