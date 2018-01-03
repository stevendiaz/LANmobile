import { BASE_API_URL, LOGIN_ROUTE, SIGNUP_ROUTE } from '../config'
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

  signIn(email, password) {
    const loginUrl = BASE_API_URL + LOGIN_ROUTE
    return fetch(loginUrl, {
        method: 'POST',
        headers: this.headers(),
        body: JSON.stringify({'username': email, 'password': password }),
      })
      .then((authResponse) => authResponse.json())
  }

  getSignUpJSON(form) {
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
        body: this.getSignUpJSON(form),
      })
      .then((authResponse) => authResponse.json())
      .catch((error) => {
        console.log(error)
      })
  }
}

