import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR } from "./actionTypes";
import {setAlert} from "./alert";
// import { setAlert } from "./alert";

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        console.log('/api/profile/me ', res);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch(e){
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        })
    }
};

export const createProfile = (profileData, history, create = true) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile', profileData, config)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        const message = create ? 'Profile created' : 'Profile updated';
        dispatch( setAlert(message, 'success'));

        if(create){
            history.push('/dashboard');
        }

    }catch(e){
        console.error(e.response.data.errors);
        const errors = e.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
}