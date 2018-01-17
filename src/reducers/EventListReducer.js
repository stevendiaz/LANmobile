import { EVENT_LIST_FETCH_SUCCESS } from '../actions/types'

const INITIAL_STATE = {
  eventList: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EVENT_LIST_FETCH_SUCCESS:
      return {...state, eventList: action.payload}
    default:
      return state
  }
}
