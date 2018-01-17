import {
  EVENT_FIELD_SET,
  EVENT_DATE_SET,
  EVENT_CREATE_LOADING,
  EVENT_CREATE_SUCCESS,
  EVENT_LIST_FETCH_SUCCESS, } from './types'
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
    .then(response => createEventRequestSuccess(dispatch, response))
    .catch((error) => {
      console.log('request failure: ' + error)
      dispatch({
        type: EVENT_CREATE_FAILURE
      })
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
