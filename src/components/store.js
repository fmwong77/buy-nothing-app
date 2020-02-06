import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allReducer from '../reducers';

const middleware = [thunk];

const store = createStore(allReducer, {}, applyMiddleware(...middleware));

export default store;
