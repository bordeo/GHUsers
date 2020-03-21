import {handleActions} from 'redux-actions';

import {UserListState, UserListAction, AddUserAction} from '../types';
import deepClone from 'deep-clone';
import actions from './actions';

export const initialState: UserListState = {
  users: [],
  refreshing: false,
  error: null,
  totalCount: null,
  next: null,
};

export const reducerMap = {
  [actions.userList.request]: state => ({
    ...state,
    refreshing: true,
  }),
  [actions.userList.failure]: (state, {payload}) => {
    return {
      ...state,
      error: payload,
      refreshing: false,
    };
  },
  [actions.userList.success]: (state, {payload}) => {
    return {
      ...state,
      ...payload,
      error: null,
      refreshing: false,
    };
  },
};
export default handleActions(reducerMap, initialState);
