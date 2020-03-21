import {createActions} from 'redux-actions';

export enum USER_LIST_ACTION_TYPES {
  REQUEST = 'USER_LIST/REQUEST',
  FAILURE = 'USER_LIST/FAILURE',
  SUCCESS = 'USER_LIST/SUCCESS',
}
export enum USER_PROFILE_ACTION_TYPES {
  REQUEST = 'USER_PROFILE/REQUEST',
  FAILURE = 'USER_PROFILE/FAILURE',
  SUCCESS = 'USER_PROFILE/SUCCESS',
}
export enum USER_REOPS_ACTION_TYPES {
  REQUEST = 'USER_REOPS/REQUEST',
  FAILURE = 'USER_REOPS/FAILURE',
  SUCCESS = 'USER_REOPS/SUCCESS',
}

export const actionMap = {
  USER_LIST: {
    REQUEST: undefined,
    FAILURE: undefined,
    SUCCESS: undefined,
  },
  USER_PROFILE: {
    REQUEST: undefined,
    FAILURE: undefined,
    SUCCESS: undefined,
  },
  USER_REPOS: {
    REQUEST: undefined,
    FAILURE: undefined,
    SUCCESS: undefined,
  },
};

export default createActions(actionMap);
