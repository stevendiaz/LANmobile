import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import SignupReducer from './SignupReducer'

export default reducers = combineReducers({
  auth: AuthReducer,
  signup: SignupReducer,
})
