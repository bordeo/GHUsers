import actions from './actions';
import githubApi from '../../services/api/github';

export const searchUsers = payload =>
  async function thunk(dispatch) {
    dispatch(actions.userList.request());

    try {
      const response = await githubApi.getUsers(payload);
      console.log(response);
      dispatch(actions.userList.success(response));
    } catch (error) {
      console.log(error);
      dispatch(actions.userList.failure(error));
    }
  };

export const getUserProfile = payload =>
  async function thunk(dispatch) {
    dispatch(actions.userProfile.request());

    try {
      const response = await githubApi.getUserProfile(payload);
      console.log(response);
      dispatch(actions.userProfile.success(response));
    } catch (error) {
      console.log(error);
      dispatch(actions.userProfile.failure(error));
    }
  };

export const getUserRepos = payload =>
  async function thunk(dispatch) {
    dispatch(actions.userRepos.request());

    try {
      const response = await githubApi.getUserRepos(payload);
      console.log(response);
      dispatch(actions.userRepos.success(response));
    } catch (error) {
      console.log(error);
      dispatch(actions.userRepos.failure(error));
    }
  };

export default {searchUsers, getUserProfile};
