import {
  EVENT_FIELD_SET,
  EVENT_DATE_SET,
  EVENT_CREATE_LOADING,
  EVENT_CREATE_SUCCESS,
  EVENT_LIST_FETCH_SUCCESS,
  EVENT_CREATE_FAILURE, } from './types'
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

export const fetchEvents = (jwtToken) => {
  return (dispatch) => {
    api = new Api()
    api.fetchEvents(jwtToken)
      .then(response => fetchEventsRequestSuccess(dispatch, response))
      .catch((error) => {
        console.log('fetch events failure: ' + error)
      })
  }
}

const fetchEventsRequestSuccess = (dispatch, response) => {
  dispatch({
    type: EVENT_LIST_FETCH_SUCCESS,
    payload: response,
  })
}

const createEventRequest = (dispatch, form, userJwt) => {
  api = new Api()
  api.createEvent(form, userJwt)
    .then(response => handleEventResponse(dispatch, response))
    .catch((error) => {
      createEventRequestFailure(dispatch, error)
    })
}

const handleEventResponse = async(dispatch, response) => {
  let body = await response.json()
  if (response.ok) {
    createEventRequestSuccess(dispatch, body)
  } else {
    createEventRequestFailure(dispatch, body["non_field_errors"].pop())
  }
}

const createEventRequestFailure = (dispatch, error) => {
  dispatch({
    type: EVENT_CREATE_FAILURE,
    payload: error,
  })
}

const createEventRequestSuccess = (dispatch, response) =>  {
  dispatch({
    type: EVENT_CREATE_SUCCESS,
    payload: response,
  })
  dispatch({
    type: NavigationActions.NAVIGATE,
    routeName: 'eventList'
  })
}
