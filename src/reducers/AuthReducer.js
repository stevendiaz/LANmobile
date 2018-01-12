import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_FIELD_ERROR,
  LOGIN_USER_FAILURE,
  LOGIN_USER_LOADING,
  LOGIN_PERSISTED_USER,
  LOGOUT_USER,
  TOGGLE_RUSH_MODAL,
  SIGNUP_USER_SUCCESS,
  TOGGLE_SIGNUP_COMPLETE_MODAL} from '../actions/types'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: '',
  user: null,
  jwtToken: null,
  loading: false,
  showRushModal: false,
  showSignupCompleteModal: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_SIGNUP_COMPLETE_MODAL:
      return {...state, showSignupCompleteModal: action.payload}
    case SIGNUP_USER_SUCCESS:
      return {...state, ...INITIAL_STATE, showSignupCompleteModal: true }
    case TOGGLE_RUSH_MODAL:
      return {...state, showRushModal: action.payload }
    case LOGOUT_USER:
      return {...state, jwtToken: null }
    case EMAIL_CHANGED:
      return { ...state, email: action.payload }
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload }
    case LOGIN_USER_LOADING:
      return { ...state, loading: true, error: '' }
    case LOGIN_USER_SUCCESS:
      return { ...state,
        ...INITIAL_STATE,
        user: action.payload.user,
        jwtToken: action.payload.jwt_token
      }
    case LOGIN_PERSISTED_USER:
      return { ...state,
        user: action.payload.user,
        jwtToken: action.payload.jwt_token
      }
    case LOGIN_FIELD_ERROR:
      return { ...state, error: action.payload, loading: false }
    case LOGIN_USER_FAILURE:
      return { ...state, error: "Looks like something went wrong. Try again later", loading: false }
    default:
      return state
  }
}
