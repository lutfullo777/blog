import axios from "axios";

import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOG_OUT,
} from "../constTypes/types";

export const userRegister = (formData) => async (dispatch) => {
  try {
    const { name, email, password } = formData;
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      "/register",
      { name, email, password },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: res });
    localStorage.setItem("userInfo", JSON.stringify(res));
    document.querySelector(".register-form").classList.remove("show-register");
    setTimeout(() => {
      localStorage.removeItem("userInfo");
      dispatch({ type: USER_LOG_OUT });
    }, 5000);
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data.error });
  }
};
