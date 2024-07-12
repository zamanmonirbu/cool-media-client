import * as PostsApi from "../api/PostsRequests";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const commentPost = (id, comment) => async (dispatch) => {
  try {
    const { data } = await PostsApi.commentPost(id, comment);
    dispatch({ type: "COMMENT_SUCCESS", data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "COMMENT_FAIL" });
  }
};
