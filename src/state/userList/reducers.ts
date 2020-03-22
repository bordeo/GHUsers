import {handleActions} from 'redux-actions';

import {UserListState} from '../types';
import actions from './actions';

export const initialState: UserListState = {
  users: [],
  userProfile: null,
  userRepos: null,
  refreshing: false,
  error: null,
  totalCount: 0,
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
  [actions.userList.add]: (state, {payload}) => ({
    ...state,
    users: [...state.users, ...payload.users],
    totalCount: payload.total_count,
    next: payload.next,
    error: null,
    refreshing: false,
  }),
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
  [actions.user.reset]: state => {
    return {
      ...state,
      userProfile: null,
      userRepos: null,
    };
  },
};
export default handleActions(reducerMap, initialState);
