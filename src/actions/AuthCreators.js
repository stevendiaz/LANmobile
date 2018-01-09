import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_FIELD_ERROR,
  LOGIN_USER_LOADING,
  LOGIN_PERSISTED_USER,
  LOGOUT_USER, }from './types'
import Api from '../api'
import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { USER_JWT_TOKEN } from '../constants.js'

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
  if (!authResponse.non_field_errors) {
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
  else {
    dispatch({
      type: LOGIN_FIELD_ERROR,
      payload: authResponse.non_field_errors[0]
    })
  }
}

