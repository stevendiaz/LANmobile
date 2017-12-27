import {
  SIGNUP_FIELD_SET,
  SIGNUP_FIELD_ERROR,
  SIGNUP_USER_LOADING,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE } from '../actions/types'

const INITIAL_STATE = {
  email: '',
  password: '',
  confirmPassword: '',
  firstname: '',
  lastname: '',
  concentration: '',
  error: '',
  graduationDate: undefined,
  loading: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_FIELD_SET:
      newState = {...state}
      newState[action.payload.key] = action.payload.value
      return newState
    case SIGNUP_USER_LOADING:
      return {...state, loading: true}
    case SIGNUP_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE }
    case SIGNUP_FIELD_ERROR:
      return { ...state, error: action.payload}
    case SIGNUP_USER_FAILURE:
      return { ...state, error: "Something went wrong. Please try again.", loading: false}
    default:
      return state
  }
}
