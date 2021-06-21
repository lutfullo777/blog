import {
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAIL,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
} from "../constTypes/types";

const initialState = {};
export const sendComment = (state = initialState, action) => {
  switch (action.type) {
    case POST_COMMENT_REQUEST:
      return {};
    case POST_COMMENT_SUCCESS:
      return {
        sentComment: action.payload,
      };
    case POST_COMMENT_FAIL:
      return {
        sendCommentError: action.payload,
      };
    default:
      return state;
  }
};

export const getComment = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT_REQUEST:
      return {
        loading: true,
        getComment: [],
      };
    case GET_COMMENT_SUCCESS:
      return {
        getComment: action.payload,
        loading: false,
      };
    case GET_COMMENT_FAIL:
      return {
        loading: false,
        getCommentError: action.payload,
      };
    default:
      return state;
  }
};
