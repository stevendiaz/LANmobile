import { EVENT_FIELD_SET, EVENT_DATE_SET, EVENT_CREATE_LOADING, EVENT_CREATE_SUCCESS } from './types'
import Api from '../api'
import { NavigationActions } from 'react-navigation'

export const setEventFormValue = ({key, value}) => {
  return {
    type: EVENT_FIELD_SET,
    payload: {
      key: key,
      value: value,
    }
  }
}

export const createEvent = (form, userJwt) => {
  return (dispatch) => {
    dispatch({ type: EVENT_CREATE_LOADING })
    createEventRequest(dispatch, form, userJwt)
  }
}

export const setDateValue = (date) => {
  return {
    type: EVENT_DATE_SET,
    payload: date,
  }
}

const createEventRequest = (dispatch, form, userJwt) => {
  api = new Api()
  api.createEvent(form, userJwt)
    .then(response => createEventRequestSuccess(dispatch, response))
    .catch((error) => {
      console.log(error)
    })
}

const createEventRequestSuccess = (dispatch, response) =>  {
  console.log('request success: ' + JSON.stringify(response))
  dispatch({
    type: EVENT_CREATE_SUCCESS,
    payload: response,
  })
  dispatch({
    type: NavigationActions.NAVIGATE,
    routeName: 'eventList'
  })
}
