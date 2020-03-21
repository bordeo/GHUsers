import {handleActions} from 'redux-actions';

import {UserListState} from '../types';
import deepClone from 'deep-clone';
import actions from './actions';

export const initialState: UserListState = {
  users: [],
  userProfile: null,
  userRepos: null,
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
  [actions.userProfile.request]: state => ({
    ...state,
    userProfile: null,
    refreshing: true,
  }),
  [actions.userProfile.failure]: (state, {payload}) => {
    return {
      ...state,
      error: payload,
      refreshing: false,
    };
  },
  [actions.userProfile.success]: (state, {payload}) => {
    return {
      ...state,
      ...payload,
      error: null,
      refreshing: false,
    };
  },
  [actions.userRepos.request]: state => ({
    ...state,
    userRepos: null,
    refreshing: true,
  }),
  [actions.userRepos.failure]: (state, {payload}) => {
    return {
      ...state,
      error: payload,
      refreshing: false,
    };
  },
  [actions.userRepos.success]: (state, {payload}) => {
    return {
      ...state,
      ...payload,
      error: null,
      refreshing: false,
    };
  },
};
export default handleActions(reducerMap, initialState);
