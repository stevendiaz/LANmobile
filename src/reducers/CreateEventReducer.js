import { EVENT_FIELD_SET } from '../actions/types'

const INITIAL_STATE = {
  location: '',
  datetime: '',
  title: '',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EVENT_FIELD_SET:
      newState = {...state}
      newState[action.payload.key] = action.payload.value
      return newState
    default:
      return state
  }
}
