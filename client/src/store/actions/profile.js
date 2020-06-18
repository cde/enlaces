import axios from 'axios';
import {GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETED } from "./actionTypes";
import {setAlert} from "./alert";

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch(e){
        dispatch({
            type: PROFILE_ERROR
            // payload: { msg: e.response.data.msg, status: e.response.status}

        })
    }
};

export const createOrUpdateProfile = (profileData, history, isUpdated = true) => async dispatch => {
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

        const message = isUpdated ? 'Profile updated' : 'Profile created';
        dispatch( setAlert(message, 'success'));

        if(!isUpdated){
            history.push('/dashboard');
        }

    }catch(e){
        console.error(e.response.data.errors);
        const errors = e.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        });
    }
};

export const updateExperience = (experienceData, history) => async dispatch=> {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience', experienceData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch( setAlert('Experience updated', 'success'));
        history.push('/dashboard');
    } catch (e) {
        console.error(e.response.data.errors);
        const errors = e.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        });
    }
};

export const updateEducation = (educationData, history) => async dispatch=> {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/education', educationData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch( setAlert('Education updated', 'success'));
        history.push('/dashboard');
    } catch (e) {
        console.error(e.response.data.errors);
        const errors = e.response.data.errors;
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        });
    }
};

export const deleteExperienceOrEducation = (id, isExperience = true) => async dispatch => {
    try {
        console.log(id);
        const uri = `/api/profile/${isExperience ? `experience/${id}` : `education/${id}`}`
        const res = await axios.delete(uri);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        const msg = isExperience ? 'Experienced deleted' : 'Education deleted'
        dispatch(setAlert(msg, 'success'));
    } catch (e) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        });
    }
};

// Delete account & profile
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            await axios.delete('/api/profile');

            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });

            dispatch(setAlert('Your account has been permanently deleted'));
        } catch (e) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: e.response.statusText, status: e.response.status }
            });
        }
    }
};
