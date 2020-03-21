import {createStore, combineReducers, applyMiddleware} from 'redux';
import {AppState} from './types';
import {reducers as userList} from './userList';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const reducers = {
  userList,
};

const rootReducer = combineReducers<AppState>({...reducers});

export default createStore(rootReducer, applyMiddleware(thunk, logger));
