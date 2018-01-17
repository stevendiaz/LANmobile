import { EVENT_FIELD_SET, EVENT_DATE_SET } from '../actions/types'
import moment from 'moment'

const INITIAL_STATE = {
  location: '',
  datetime: moment(),
  title: '',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EVENT_FIELD_SET:
      newState = {...state}
      newState[action.payload.key] = action.payload.value
      return newState
    case EVENT_DATE_SET:
      return {...state, datetime: moment(action.payload, 'MMMM Do [at] h:mm[]a') }
    default:
      return state
  }
}
