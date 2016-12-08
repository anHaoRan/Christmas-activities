import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import reducers from '../reducers';
let node_env = process.env.NODE_ENV || 'development';
let middleWares = [promise(), thunk];

if (typeof window !== 'undefined' && node_env !== 'production') {
  middleWares.push(logger());
}

const createStoreWidthMiddleWare = applyMiddleware(...middleWares)(createStore);

export default function configureStore(initialStates) {
  return createStoreWidthMiddleWare(reducers, initialStates);
}
