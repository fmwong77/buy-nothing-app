import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './components/store';
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import allReducer from './reducers';

// const middleware = [thunk];

// const store = createStore(
// 	allReducer,
// 	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
