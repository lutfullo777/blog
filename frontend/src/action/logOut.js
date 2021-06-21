import { USER_LOG_OUT } from '../constTypes/types';

const logOutAction = ()=> (dispatch) => {
        dispatch({ type: USER_LOG_OUT});
}

export default logOutAction;