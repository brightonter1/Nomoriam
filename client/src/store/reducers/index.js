import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './authReducer'
import challengeReducer from './challengeReducer'
export default combineReducers({
    auth: authReducer,
    challenge: challengeReducer,
    form: formReducer
})
