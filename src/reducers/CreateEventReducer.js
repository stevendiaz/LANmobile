import { EVENT_FIELD_SET, EVENT_DATE_SET, EVENT_CREATE_SUCCESS, EVENT_CREATE_FAILURE, EVENT_CREATE_LOADING } from '../actions/types'
import { DATETIME_FORMAT } from '../constants'
import moment from 'moment'

const INITIAL_STATE = {
  location: '',
  datetime: null,
  title: '',
  loading: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EVENT_CREATE_LOADING:
      return {...state, loading: true}
    case EVENT_FIELD_SET:
      newState = {...state}
      newState[action.payload.key] = action.payload.value
      return newState
    case EVENT_DATE_SET:
      date = moment(action.payload, DATETIME_FORMAT)
      return {...state, datetime: date }
    case EVENT_CREATE_SUCCESS:
      return {...state, ...INITIAL_STATE}
    case EVENT_CREATE_FAILURE:
      return {...state, ...INITIAL_STATE}
    default:
      return state
  }
}
