import axios from "axios";

import {
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAIL,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
} from "../constTypes/types";

export const commentAction = (comment, id) => async (dispatch) => {
  try {
    dispatch({ type: POST_COMMENT_REQUEST });
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

      const { data } = await axios.post(
        "/comment/set",
        { comment, id },
        config
      );
      
      dispatch({ type: POST_COMMENT_SUCCESS, payload: data });
    } else {
      document.querySelector(".register-form").classList.add("show-register");
    }
  } catch (err) {
    dispatch({ type: POST_COMMENT_FAIL, payload: err });
  }
};

export const getComments = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_COMMENT_REQUEST });
    

      const { data } = await axios.get(
        `/comment/get/${id}`
      );
     
      dispatch({ type: GET_COMMENT_SUCCESS, payload: data });
   
  } catch (err) {
    dispatch({ type: GET_COMMENT_FAIL, payload: err });
  }
};
