import axios from "axios";

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOG_OUT,
} from "../constTypes/types";

const Login = (formData) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { email, password } = formData;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/auth", { email, password }, config);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    document.querySelector(".register-form").classList.remove("show-register");
    localStorage.setItem("userInfo", JSON.stringify(data));
    setTimeout(() => {
      localStorage.removeItem("userInfo");
      dispatch({ type: USER_LOG_OUT });
    }, 36000000);
  } catch (err) {
    dispatch({ type: USER_LOGIN_FAIL, payload: err.response.data.message });
  }
};

export default Login;
