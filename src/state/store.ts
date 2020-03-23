import {createStore, combineReducers, applyMiddleware} from 'redux';
import {AppState} from './types';
import {reducers as users} from './users';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const reducers = {
  users,
};

const rootReducer = combineReducers<AppState>({...reducers});

export default createStore(rootReducer, applyMiddleware(thunk, logger));
