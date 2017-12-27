import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_FIELD_ERROR,
  LOGIN_USER_LOADING,
  SIGNUP_FIELD_SET,
  SIGNUP_USER_SUCCESS,
  SIGNUP_FIELD_ERROR,
  SIGNUP_USER_FAILURE,
  SIGNUP_USER_LOADING } from './types'
import Api from '../api'
import { MIN_PASSWORD_LENGTH, USERNAME_ERROR_MESSAGE, labels } from '../components/constants'

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

// Signup Action Creators

export const setSignupFormValue = ({ key, value }) => {
  return {
    type: SIGNUP_FIELD_SET,
    payload: {
      key: key,
      value: value,
    }
  }
}

export const signupUser = (form) => {
  console.log("in action creator")
  console.log(form)
  return (dispatch) => {
    dispatch({ type: SIGNUP_USER_LOADING })
    errors = validate(form)
    if (errors.length) {
      dispatch({
        type: SIGNUP_FIELD_ERROR,
        payload: errors[0],
      })
      return
    }
    api = new Api()
    api.signUp(form)
      .then(authResponse => signupUserRequestSuccess(dispatch, authResponse))
      .catch((error) => {
        console.log(error)
        signupUserRequestFailure(dispatch)
      })
  }
}

const signupUserRequestFailure = (dispatch) => {
  dispatch({
    type: SIGNUP_USER_FAILURE,
  })
}

const getErrors = (authResponse) => {
  if (authResponse.non_field_errors) {
    return authResponse.non_field_errors[0]
  }
  else if (authResponse.username && authResponse.username == USERNAME_ERROR_MESSAGE) {
    return authResponse.username[0]
  }
}

const signupUserRequestSuccess = (dispatch, authResponse) => {
  errors = getErrors(authResponse)
  if (!errors) {
    dispatch({
      type: SIGNUP_USER_SUCCESS,
      payload: authResponse,
    })
  }
  else {
    dispatch({
      type: SIGNUP_FIELD_ERROR,
      payload: errors,
    })
  }
}

const validate = (form) => {
  errors = []
  if (form.password != form.confirmPassword) {
    errors.push("Passwords must match")
  }
  if (form.password.length < MIN_PASSWORD_LENGTH) {
    errors.push("Passwords must be at least" + MIN_PASSWORD_LENGTH + " characters")
  }
  for (let key of Object.keys(form)) {
    if (isError(key, form)) {
      errors.push(labels[key].display + " field is blank")
    }
  }
  return errors
}

const isError = (key, form) => {
  return key != 'error' && key != 'loading' && form[key] == '' || form[key] == undefined
}
