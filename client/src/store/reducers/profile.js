import { GET_PROFILE,
    GET_PROFILES,
    GET_REPOS,
    CLEAR_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from "../actions/actionTypes";

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    repos: [],
    error: {}
}

const profile = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return{
                ...state,
                profile: payload,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return{
                ...state,
                profile: null,
                loading: false,
                repos: []
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            }
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }

        default:
            return state;
    }
};

export default profile;