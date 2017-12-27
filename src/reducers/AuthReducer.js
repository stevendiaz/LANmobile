import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_FIELD_ERROR,
  LOGIN_USER_FAILURE } from '../actions/types'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: '',
  user: null,
  jwtToken: null,
}

export default (state = INITIAL_STATE, action) => {
  console.log(action)
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload }
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload }
    case LOGIN_USER_SUCCESS:
      return { ...state, error: '', user: action.payload.user, jwtToken: action.payload.jwt_token }
    case LOGIN_FIELD_ERROR:
      return { ...state, error: action.payload }
    case LOGIN_USER_FAILURE:
      return { ...state, error: "Looks like something went wrong. Try again later" }
    default:
      return state
  }
}
