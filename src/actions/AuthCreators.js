import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_FIELD_ERROR,
  LOGIN_USER_LOADING,
  LOGIN_PERSISTED_USER,
  LOGOUT_USER,
  TOGGLE_RUSH_MODAL,
  TOGGLE_SIGNUP_COMPLETE_MODAL, }from './types'
import Api from '../api'
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { USER_JWT_TOKEN, EMAIL_NOT_VERIFIED } from '../constants.js'

export const toggleRushModal = (showModal) => {
  return {
    type: TOGGLE_RUSH_MODAL,
    payload: showModal,
  }
}

export const toggleSignupCompleteModal = (showModal) => {
  return {
    type: TOGGLE_SIGNUP_COMPLETE_MODAL,
    payload: showModal,
  }
}

export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  }
}

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

export const loginPersistedUser = (user) => {
  return {
    type: LOGIN_PERSISTED_USER,
    payload: user,
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

const loginUserRequestSuccess = async (dispatch, authResponse) => {
  if (authResponse.non_field_errors) {
    dispatch({
      type: LOGIN_FIELD_ERROR,
      payload: authResponse.non_field_errors[0]
    })
  } else if (!authResponse.user.is_verified) {
    dispatch({
      type: LOGIN_FIELD_ERROR,
      payload: EMAIL_NOT_VERIFIED,
    })
  }
  else {
    await AsyncStorage.setItem(USER_JWT_TOKEN, authResponse.jwt_token)
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: authResponse,
    })
    dispatch({
      type: NavigationActions.NAVIGATE,
      routeName: 'drawerStack',
    })
  }
}

