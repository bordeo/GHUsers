import {createActions} from 'redux-actions';

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
