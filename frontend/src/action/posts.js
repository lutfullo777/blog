import axios from "axios";

import {
  POST_REQUEST,
  POST_SUCCESS,
  POST_FAIL,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  CREATE_POST_SUCCESS,
  CREATE_POST_REQUEST,
  CREATE_POST_FAIL,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_REQUEST,
  UPDATE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAIL
} from "../constTypes/types";

export const allPosts = () => async (dispatch) => {
  try {
    dispatch({ type: POST_REQUEST });

    const { data } = await axios.get("/api/posts");

    dispatch({ type: POST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: POST_FAIL, payload: err });
  }
};

export const getPostById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_POST_REQUEST });

    await axios.put(`/seen/${id}`);

    const { data } = await axios.get(`/post/${id}`);
  

    dispatch({ type: GET_POST_SUCCESS, payload: data });
  } catch (err) {
    
    dispatch({ type: GET_POST_FAIL, payload: err.response && err.response.data.message ? err.response.data.message : err.message});
  }
};

export const createPost = () => async (dispatch) => {
  try {
    dispatch({ type: CREATE_POST_REQUEST });

    let token;

    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      token = JSON.parse(userInfo).token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post("/admin/post", {}, config);

      dispatch({ type: CREATE_POST_SUCCESS, payload: data });
    } else {
      dispatch({ type: CREATE_POST_FAIL });
    }
  } catch (err) {
    dispatch({ type: CREATE_POST_FAIL });
  }
};

// export const updatePost = (post, image, Post, history) => async (dispatch) => {
export const updatePost = (post, Post, history) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_POST_REQUEST });

    let token;

    const userInfo = localStorage.getItem("userInfo");

    if (userInfo && post) {
      token = JSON.parse(userInfo).token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // const config1 = {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     Authorization: `Bearer ${token}`,
      //   },
      // };
      // await axios.post(`/admin/upload/${post._id}`, image, config1).then(
      //   () => {
      //     // console.log('rasm joylandi');
      //   },
      //   () => {
      //     // console.log('rasm joylanmadi');
      //   }
      // );

      await axios.put(`/admin/post/${post._id}`, Post, config).then(
        (res) => {
          dispatch({ type: UPDATE_POST_SUCCESS, payload: res.data });
          document.querySelector(".post-success").style.display = "flex";
          setTimeout(() => {
            document.querySelector(".post-success").style.display = "none";
            history.goBack(-1);
          }, 2000);
        },
        () => {
          document.querySelector(".post-error").style.display = "flex";
          setTimeout(() => {
            document.querySelector(".post-error").style.display = "none";
          }, 2000);
        }
      );
    }
  } catch (err) {
    dispatch({ type: UPDATE_POST_FAIL, payload: err });
  }
};

export const deletePost = (id, history) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_POST_REQUEST });

    let token;

    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      token = JSON.parse(userInfo).token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(`/admin/post/${id}`, config);

      history.goBack(-1);

      dispatch({ type: DELETE_POST_SUCCESS, payload: data });
    }
  } catch (err) {
    dispatch({ type: DELETE_POST_FAIL, payload: err.response.data });
  }
};

export const editPost = (post, id, history) => async (dispatch) => {
  history.push('edit')
  try {
    dispatch({ type: EDIT_POST_REQUEST });

    let token;

    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      token = JSON.parse(userInfo).token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(`/admin/post/edit/${id}`,post, config);

      history.goBack(-1);

      dispatch({ type: EDIT_POST_SUCCESS, payload: data });
    }
  } catch (err) {
    dispatch({ type: EDIT_POST_FAIL, payload: err.response.data });
  }
};



