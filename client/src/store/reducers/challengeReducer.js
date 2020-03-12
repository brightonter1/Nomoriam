import {
    CREATE_CHALLENGE,
    CREATE_CHALLENGE_FAILED,
    FETCH_CHALLENGE_ON_APPROVE,
    FETCH_CHALLENGE_BY_INDEX,
    FETCH_CHALLENGE_BY_INDEX_CLEAN_UP,
    APPROVE_CHALLENGES,
    FETCH_CHALLENGES,
    FETCH_CHALLENGE,
    FETCH_CHALLENGE_CLEAN_UP,
    JOIN_CHALLENGE,
    JOIN_CHALLENGE_CLEAN_UP,
    FETCH_ACTIVITY,
    CLEAN_UP,
    DOPOST,
    DOPOST_CLEAN,
    DOQRCODE,
    DOQRCODE_CLEAN,
    FETCH_MY_CHALLENGE,
    FETCH_MY_CHALLENGES,
    FETCH_POST
} from '../actions/type'

const INITIAL_STATE = {
    isCompleted: null,
    isFetching: null,
    isFetch: null,
    isJoined: null,
    message: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_CHALLENGE:
            return { ...state, isCompleted: true, message: action.payload }
        case CREATE_CHALLENGE_FAILED:
            return { ...state, isCompleted: false, message: action.payload }
        case FETCH_CHALLENGE_ON_APPROVE:
            return { ...state, onApprove: action.payload, isFetching: true }
        case FETCH_CHALLENGE_BY_INDEX:
            return { ...state, isFetching: true, challenge: action.payload }
        case FETCH_CHALLENGE_BY_INDEX_CLEAN_UP:
            return { ...state, isFetching: null, challenge: null }
        case APPROVE_CHALLENGES:
            return { ...state, isCompleted: true, txHash: action.payload }
        case FETCH_CHALLENGES:
            return { ...state, isFetch: true, challenges: action.payload }
        case FETCH_CHALLENGE:
            return { ...state, isFetching: true, challenge: action.payload }
        case FETCH_CHALLENGE_CLEAN_UP:
            return { ...state, isFetching: null, challenge: null }
        case JOIN_CHALLENGE:
            return { ...state, message: action.payload, isJoined: true }
        case JOIN_CHALLENGE_CLEAN_UP:
            return { ...state, message: null, isJoined: null }
        case CLEAN_UP:
            return { ...state, isCompleted: null, isFetch: null, isFetching: null, isJoined: null, message: null, txHash: null, isAllFetch: null }
        case FETCH_ACTIVITY:
            return { ...state, activity: action.payload, isActivity: true }
        case DOPOST:
            return { ...state, isPosted: action.isPosted, message: action.payload, medal: action.medal }
        case DOPOST_CLEAN:
            return { ...state, isPosted: null, message: null, medal: null }
        case DOQRCODE:
            return { ...state, isQRcoded: action.isPosted, messageQR: action.payload, medal: action.medal }
        case DOQRCODE_CLEAN:
            return { ...state, isQRcoded: null, messageQR: null, medal: null }
        case FETCH_MY_CHALLENGE:
            return { ...state, challengeApproved: action.payload, isAllFetch: true, challengeNotApprove: action.myChallenges }
        case FETCH_MY_CHALLENGES:
            return { ...state, getData: action.getData, myChallenge: action.payload }
        case FETCH_POST:
            return { ...state, posts: action.payload, isPost: true }
        default:
            return state;
    }
}