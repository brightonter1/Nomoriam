import {
    CREATE_CHALLENGE,
    FETCH_CHALLENGES_APPROVE,
    FETCH_CHALLENGES_NOTFOUND,
    APPROVE_CHALLENGES,
    FETCH_CHALLENGES,
    FETCH_CHALLENGE,
    JOIN_CHALLENGE
} from '../actions/type'

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_CHALLENGE:
            return { ...state, isSuccess: true }
        case FETCH_CHALLENGES_APPROVE:
            return { ...state, challengesApprove: action.payload, isFetchApprove: true }
        case FETCH_CHALLENGES_NOTFOUND:
            return { ...state, isFetch: action.payload }
        case APPROVE_CHALLENGES:
            return { ...state, txHash: action.payload, isCompleted: action.isComplete }
        case FETCH_CHALLENGES:
            return { ...state, challenges: action.payload, isFetch: action.isComplete }
        case FETCH_CHALLENGE:
            return { ...state, [action.index]: action.payload }
        case JOIN_CHALLENGE:
            return { ...state, isJoined: action.isJoined }
        default:
            return state
    }
}