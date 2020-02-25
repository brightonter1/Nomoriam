import { combineReducers } from 'redux'
import { reducer as formReducer} from 'redux-form'
import authReducer from './authReducer'
import challengeReducer from './challengeReducer'
import feedReducer from './feedReducer'

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    challenge: challengeReducer,
    feed: feedReducer
})
