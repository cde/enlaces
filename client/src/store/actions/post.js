import axios from 'axios';
import { setAlert } from './alert';
import { DELETE_POST, GET_POSTS, ADD_POST, POST_ERROR, UPDATE_LIKES } from "./actionTypes";


export const getPosts = () => async dispatch => {
    try {
        console.log('in action post')
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch(e) {
        console.error(e);
        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const addLikes = (postId) => async  dispatch => {
    try {
        console.log('in action post')
        const res = await axios.put(`/api/posts/like/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data}
        })
    } catch(e) {
        console.error(e);
        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const removeLikes = (postId) => async  dispatch => {
    try {
        console.log('in action post')
        const res = await axios.put(`/api/posts/unlike/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data}
        })
    } catch(e) {
        console.error(e);
        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status}
        })
    }
}

export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/posts', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post Created', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
export const deletePost = id => async dispatch => {
    try {
        console.log(id);
        const res = await axios.delete(`/api/posts/${id}`);
        console.log(res);
        dispatch({
            type: DELETE_POST,
            payload: id
        });

        dispatch(setAlert('Post Deleted', 'success'));
    } catch (e) {
        console.error(e);
        dispatch({
            type: POST_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status }
        });
    }
};