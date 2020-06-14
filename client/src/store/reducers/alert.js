import * as actionsTypes from '../actions/actionTypes'

const initialState = []
const alert =(state = initialState, action)=> {
    switch (action.type) {
        case actionsTypes.SET_ALERT:
            console.log(action.payload)
            return [...state, action.payload];
        case actionsTypes.REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload);
        default:
            return state;
    }
}

export default alert;