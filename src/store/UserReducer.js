export const USER_ACTION_TYPE = {
    SET_CURRENT_SIGNIN_USER: 'SET_CURRENT_USER',
    SET_CURRENT_SIGNUP_USER: 'SET_CURRENT_SIGNUP_USER',
    SET_CURRENT_SIGNOUT_USER: 'SET_CURRENT_SIGNOUT_USER',
}

const INITIAL_STATE = {
    currentUser: JSON.parse(localStorage.getItem('current')) || null,
}

export const userReducer = (state=INITIAL_STATE,action) => {
    const { type, payload } = action;
    switch(type) {
        case USER_ACTION_TYPE.SET_CURRENT_SIGNIN_USER:
            return {...state, currentUser: payload}
        // case USER_ACTION_TYPE.SET_CURRENT_SIGNOUT_USER:
        //     return {...state, currentUser: null}
        default:
            return state;
    }
}