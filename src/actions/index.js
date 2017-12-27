import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_FIELD_ERROR,
  LOGIN_USER_LOADING } from './types'
import Api from '../api'

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_LOADING })
    api = new Api()
    api.signIn(email, password)
      .then(authResponse => loginUserRequestSuccess(dispatch, authResponse))
      .catch((error) => {
        console.log(error)
        loginUserFailure(dispatch)
      })
  }
}

const loginUserFailure = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAILURE,
  })
}

const loginUserRequestSuccess = (dispatch, authResponse) => {
  if (!authResponse.non_field_errors) {
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: authResponse,
    })
  }
  else {
    dispatch({
      type: LOGIN_FIELD_ERROR,
      payload: authResponse.non_field_errors[0]
    })
  }
}
