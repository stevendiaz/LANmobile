import { BASE_API_URL, LOGIN_ROUTE, SIGNUP_ROUTE } from '../config'
import * as constants from '../components/constants'

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
    result.concentration = constants.labels.concentration.dropdownOptions[result.concentration]
    console.log("result json body: " + JSON.stringify(result))
    return JSON.stringify(result)
  }

  signUp(form) {
    const signUpUrl = BASE_API_URL + SIGNUP_ROUTE
    console.log("register json@@")
    console.log(this.getSignUpJSON(form))
    return fetch(signUpUrl, {
        method: 'POST',
        headers: this.headers(),
        body: this.getSignUpJSON(form),
      })
      .then((authResponse) => authResponse.json())
  }
}

