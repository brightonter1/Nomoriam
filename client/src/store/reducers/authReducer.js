import {
    SIGN_IN,
    SIGN_OUT
} from '../actions/type'

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null,
    name: null,
    photoUrl: null
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, userId: action.payload.userId, name: action.payload.name, photoUrl: action.payload.photoURL, role: action.payload.roleAdmin  }
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userId: null }
        default:
            return state;
    }
}