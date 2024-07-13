import * as UserApi from '../api/UserRequests.js';

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: 'UPDATING_START' });
  try {
    const { data } = await UserApi.updateUser(id, formData);
    dispatch({ type: 'UPDATING_SUCCESS', data });
  } catch (error) {
    console.log("Fail",id, formData)
    dispatch({ type: 'UPDATING_FAIL' });
  }
};

export const followUser = (id, data) => async (dispatch) => {
  dispatch({ type: 'FOLLOW_USER', data: id });
  await UserApi.followUser(id, data);
};

export const unfollowUser = (id, data) => async (dispatch) => {
  dispatch({ type: 'UNFOLLOW_USER', data: id });
  await UserApi.unfollowUser(id, data);
};


