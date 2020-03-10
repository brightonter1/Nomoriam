import {
    SIGN_IN,
    SIGN_IN_FAILED,
    SIGN_OUT,
    SIGN_UP,
    SIGN_UP_FAILED,
    INITIAL_PROFILE,
    INITIAL_PROFILE_CLEAN,
    FETCH_PROFILE,
    EDITE_PHOTO,
    EDITE_PROFILE,
    EDITE_CLEAN
} from '../actions/type'

const INITIAL_STATE = {
    isSignedIn: null
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, userInfo: action.payload }
        case SIGN_IN_FAILED:
            return { ...state, isSignedIn: false, message: action.payload }
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userInfo: null }
        case SIGN_UP:
            return { ...state, isCompleted: true, message: action.payload }
        case SIGN_UP_FAILED:
            return { ...state, isCompleted: false, message: action.payload }
        case INITIAL_PROFILE:
            return { ...state, profile: action.payload }
        case INITIAL_PROFILE_CLEAN:
            return { ...state, profile: null }
        case FETCH_PROFILE:
            return { ...state, userProfile: action.payload, isFetch: true }
        case EDITE_PHOTO:
            return { ...state, isCompleted: action.isEdit }
        case EDITE_PROFILE:
            return { ...state, isCompleted: action.isEdit }
        case EDITE_CLEAN:
            return { ...state, isCompleted: null }
        default:
            return state;
    }
}