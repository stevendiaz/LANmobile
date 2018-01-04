import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import SignupReducer from './SignupReducer'
import NavigationReducer from './NavigationReducer'

export default reducers = combineReducers({
  auth: AuthReducer,
  signup: SignupReducer,
  nav: NavigationReducer,
})
