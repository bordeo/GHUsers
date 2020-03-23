import {createActions} from 'redux-actions';

export const actionMap = {
  USER_LIST: {
    REQUEST: undefined,
    FAILURE: undefined,
    SUCCESS: undefined,
    ADD: undefined,
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
  USER: {
    RESET: undefined,
  },
};

export default createActions(actionMap);
