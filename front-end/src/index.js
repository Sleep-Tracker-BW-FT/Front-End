import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import { userReducer } from './reducers/reducer';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk'
const store = createStore(userReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

