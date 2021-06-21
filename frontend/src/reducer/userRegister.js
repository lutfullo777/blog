import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOG_OUT,
} from "../constTypes/types";

const initialState = {};
const Register = (state = initialState, action) => {

  switch (action.type) {
    case USER_REGISTER_REQUEST:
    
      return {
        register: false,
        load: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        userRegis: action.payload,
        register: true,
        load: false,
      };
    case USER_REGISTER_FAIL:
     
      return {
        load: false,
        register: false,
        error: action.payload,
      };
    case USER_LOG_OUT:
      return {
        register: false,
      };
    default:
      return state;
  }
};
export default Register;
