import actions from './actions';
import githubApi from '../../services/api/github';

export const searchUsers = payload =>
  async function thunk(dispatch) {
    console.log(actions);
    console.log(payload);
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

export default {searchUsers};
