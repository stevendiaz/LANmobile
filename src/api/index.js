import {
  BASE_API_URL,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
  REFRESH_JWT_ROUTE,
  RUSH_STATUS_ROUTE,
  EVENT_ROUTE, } from '../config'
import * as constants from '../constants'

export default class Api {

  headers() {
    return {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Content-Type': 'application/json',
    }
  }

  _authHeaders(userJwt) {
    console.log('user jwt: ' + userJwt)
    return {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userJwt,
    }
  }

  signIn(email, password) {
    const loginUrl = BASE_API_URL + LOGIN_ROUTE
    return fetch(loginUrl, {
        method: 'POST',
        headers: this.headers(),
        body: JSON.stringify({'username': email, 'password': password }),
      })
      .then((authResponse) => authResponse.json())
  }

  _getSignUpJSON(form) {
    result = { ...form}
    result.full_name = result.firstname + " " + result.lastname
    result.username = result.email
    result.graduation_date = result.graduationDate
    result.confirm_password = result.confirmPassword
    result.concentration = constants.inputProps.concentration.dropdownOptions[result.concentration]
    return JSON.stringify(result)
  }

  signUp(form) {
    const signUpUrl = BASE_API_URL + SIGNUP_ROUTE
    return fetch(signUpUrl, {
        method: 'POST',
        headers: this.headers(),
        body: this._getSignUpJSON(form),
      })
      .then((authResponse) => authResponse.json())
      .catch((error) => {
        console.log(error)
      })
  }

  _tokenJSON(jwtToken) {
    return JSON.stringify({'token': jwtToken})
  }

  async isRushOpen() {
    const rushStatusUrl = BASE_API_URL + RUSH_STATUS_ROUTE
    return fetch(rushStatusUrl, { method: 'GET' })
            .then((response) => response.json())
            .then((response) => response.rush)
            .catch((error) => {
              console.log(error)
            })
  }

  refreshUserToken(jwtToken) {
    const refreshUrl = BASE_API_URL + REFRESH_JWT_ROUTE
    return fetch(refreshUrl, {
      method: 'POST',
      headers: this.headers(),
      body: this._tokenJSON(jwtToken),
    })
    .then((response) => response.json())
    .catch((error) => {
      console.log('refreshusertoken error: ' + error)
    })
  }

  _createEventJSON(form) {
    result = {...form}
    result.start_time = form.datetime.format()
    result.end_time = form.datetime.format()
    result.description = "No description provided."
    return JSON.stringify(result)
  }

  createEvent(form, userJwt) {
    const eventUrl = BASE_API_URL + EVENT_ROUTE
    return fetch(eventUrl, {
      method: 'POST',
      headers: this._authHeaders(userJwt),
      body: this._createEventJSON(form),
    })
    .catch((error) => {
      console.log('createeventform error: ' + error)
    })
  }

  fetchEvents(jwtToken) {
    const eventUrl = BASE_API_URL + EVENT_ROUTE
    return fetch(eventUrl, {
      method: 'GET',
      headers: this._authHeaders(jwtToken),
    })
    .then((response) => response.json())
    .catch((error) => {
      console.log('fetchevent error: ' + error)
    })
  }

}

