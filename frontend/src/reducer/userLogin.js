import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOG_OUT } from '../constTypes/types';

const initialState = { }
const Login = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                login: false,
                loading:true
            }
        case USER_LOGIN_SUCCESS:
            return {
                
                login:  true,
                userInfo: action.payload,
                loading:false
            }
        case USER_LOGIN_FAIL:
            return {
               
                login: false,
                loading: false,
                loginError: action.payload
            }
        case USER_LOG_OUT:
            return{
                login:false
            }
        default:
            return state
    }
}
export default Login