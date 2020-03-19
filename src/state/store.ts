import {createStore, combineReducers} from 'redux';
import {AppState} from './types';
import {userList} from './app/reducers';

export default createStore(
  combineReducers<AppState>({
    userList, // this is the user-list reducer
    // other sub-states reducers go here
  }),
);
