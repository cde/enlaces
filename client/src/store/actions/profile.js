import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR } from "./actionTypes";
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