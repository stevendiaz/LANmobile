import {
  SIGNUP_FIELD_SET,
  SIGNUP_USER_SUCCESS,
  SIGNUP_FIELD_ERROR,
  SIGNUP_USER_FAILURE,
  SIGNUP_USER_LOADING } from './types'
import { MIN_PASSWORD_LENGTH, USERNAME_ERROR_MESSAGE, inputProps } from '../constants'
import Api from '../api'

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
  return (dispatch) => {
    dispatch({ type: SIGNUP_USER_LOADING })
    errors = validate(form)
    errors.length ? signupFieldError(dispatch, errors) : signupRequest(dispatch, form)
  }
}

const signupRequest = (dispatch, form) => {
  api = new Api()
  api.signUp(form)
    .then(authResponse => signupUserRequestSuccess(dispatch, authResponse))
    .catch((error) => {
      console.log(error)
      signupUserRequestFailure(dispatch)
    })
}

const signupFieldError = (dispatch, errors) => {
  dispatch({
    type: SIGNUP_FIELD_ERROR,
    payload: errors[0],
  })
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
    if (key in inputProps && !form[key]) {
      errors.push(inputProps[key].display + " field is blank")
    }
  }
  return errors
}

const isError = (key, form) => {
  return key != 'error' && key != 'loading' && form[key] == '' || form[key] == undefined
}
