import {createActions} from 'redux-actions';
const prefix = 'APP';

export enum USER_LIST_ACTION_TYPES {
  REQUEST = 'USER_LIST/REQUEST',
  FAILURE = 'USER_LIST/FAILURE',
  SUCCESS = 'USER_LIST/SUCCESS',
}

export const actionMap = {
  USER_LIST: {
    REQUEST: undefined,
    FAILURE: undefined,
    SUCCESS: undefined,
  },
};

export default createActions(actionMap);
