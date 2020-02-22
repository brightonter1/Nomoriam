import {
    CREATE_CHALLENGE,
    FETCH_CHALLENGES_APPROVE,
    FETCH_CHALLENGES_NOTFOUND,
    APPROVE_CHALLENGES
} from '../actions/type'

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_CHALLENGE:
            return { isSuccess: true }
        case FETCH_CHALLENGES_APPROVE:
            return { challengesApprove: action.payload, isFetch: true }
        case FETCH_CHALLENGES_NOTFOUND:
            return { isFetch: action.payload }
        case APPROVE_CHALLENGES:
            return { txHash: action.payload, isCompleted: action.isComplete }
        default:
            return state
    }
}