import {
  POST_REQUEST,
  POST_SUCCESS,
  POST_FAIL,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  GET_POST_REQUEST,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_REQUEST,
  UPDATE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL
} from "../constTypes/types";

const initialState = {};
export const Posts = (state = initialState, action) => {
  switch (action.type) {
    case POST_REQUEST:
      return {
        loading: true,
        posts: [],
      };
    case POST_SUCCESS:
      return {
        posts: action.payload.posts,
        loading: false,
      };
    case POST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getPostById = (state = {post:{} }, action) => {
  switch (action.type) {
    case GET_POST_REQUEST:
      return {
        loading: true,
        ...state
      };
    case GET_POST_SUCCESS:
      return {
        loading: false,
        post: action.payload,
      };
    case GET_POST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createPost = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return {
        post: [],
      };
    case CREATE_POST_SUCCESS:
      return {
        post: action.payload.post,
      };
    case CREATE_POST_FAIL:
      return {
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updatePost = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_POST_REQUEST:
      return {
        loading: true,
        post: [],
      };
    case UPDATE_POST_SUCCESS:
      return {
        post: action.payload.post,
        loading: false,
      };
    case UPDATE_POST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deletePost = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return {
        load: true,
        msg: '',
      };
    case DELETE_POST_SUCCESS:
      return {
        msg: action.payload.msg,
        loading: false,
      };
    case DELETE_POST_FAIL:
      return {
        load: false,
        err: "O'chirishda xatolik yuz berdi!",
      };
    default:
      return state;
  }
};
