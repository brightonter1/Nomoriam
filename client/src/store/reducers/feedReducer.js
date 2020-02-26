import { FETCH_FFEDS } from '../actions/type'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_FFEDS:
            return { ...state, posts: action.payload, isFetch: action.isFetch }
        default:
            return state
    }
}