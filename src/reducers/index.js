import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import SignupReducer from './SignupReducer'
import NavigationReducer from './NavigationReducer'
import EventReducer from './CreateEventReducer'
import EventListReducer from './EventListReducer'

export default reducers = combineReducers({
  auth: AuthReducer,
  signup: SignupReducer,
  nav: NavigationReducer,
  events: EventReducer,
  eventsList: EventListReducer,
})
