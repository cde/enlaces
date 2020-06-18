import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    USER_LOADED,
    AUTH_FAIL,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL,
    SIGNOUT,
    ACCOUNT_DELETED
} from '../actions/actionTypes';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
}

const auth = (state = initialState, actions) => {
    switch(actions.type){
        case SIGNUP_SUCCESS:
        case SIGNIN_SUCCESS:
            localStorage.setItem('token',actions.payload.token);
            return {
                ...state,
                ...actions.payload,
                isAuthenticated: true,
                loading: false
            }
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                loading: false,
                user: actions.payload
            }
        case SIGNUP_FAIL:
        case AUTH_FAIL:
        case SIGNIN_FAIL:
        case SIGNOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
}

export default auth;