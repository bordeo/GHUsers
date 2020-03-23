import actions from './actions';
import githubApi, {
  GetUsersPayload,
  GetUserProfilePayload,
  GetUserReposPayload,
} from '../../services/api/github';
import {Action} from 'redux';
import {AppState} from '../types';
import {ThunkAction} from 'redux-thunk';

export const searchUsers = (
  payload: GetUsersPayload,
): ThunkAction<void, AppState, unknown, Action<string>> => async dispatch => {
  dispatch(actions.userList.request());
  try {
    const response = await githubApi.getUsers(payload);
    if (payload.page) {
      //we are navigate to the next page
      dispatch(actions.userList.add(response));
    } else {
      dispatch(actions.userList.success(response));
    }
  } catch (error) {
    console.log(error);
    dispatch(actions.userList.failure(error));
  }
};

export const getUserProfile = (
  payload: GetUserProfilePayload,
): ThunkAction<void, AppState, unknown, Action<string>> => async dispatch => {
  dispatch(actions.userProfile.request());

  try {
    const response = await githubApi.getUserProfile(payload);
    dispatch(actions.userProfile.success(response));
  } catch (error) {
    console.log(error);
    dispatch(actions.userProfile.failure(error));
  }
};

export const getUserRepos = (
  payload: GetUserReposPayload,
): ThunkAction<void, AppState, unknown, Action<string>> => async dispatch => {
  dispatch(actions.userRepos.request());

  try {
    const response = await githubApi.getUserRepos(payload);
    dispatch(actions.userRepos.success(response));
  } catch (error) {
    console.log(error);
    dispatch(actions.userRepos.failure(error));
  }
};

export default {searchUsers, getUserProfile};
