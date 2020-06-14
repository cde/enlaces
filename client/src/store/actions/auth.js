import axios from 'axios';
import { SIGNUP_SUCCESS, SIGNUP_FAIL, AUTH_FAIL, USER_LOADED } from "./actionTypes";
import { setAlert } from "./alert";
import setAuthToken from '../../utils/setAuthToken';

export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (e) {
        dispatch({
            type: AUTH_FAIL
        });
    }
};

// Signup user
export const signUp = ({first_name, last_name, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({first_name, last_name, email,password});
    try {
        const res = await axios.post('/api/users', body,config);
        console.log(res);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        })

    } catch(e) {
        console.error(e.response.data.errors);
        const errors = e.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({type: SIGNUP_FAIL});
    }
};
