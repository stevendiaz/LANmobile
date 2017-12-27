import { LOGIN_URL } from '../config'

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
    return fetch(LOGIN_URL, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify({'username': email, 'password': password }),
    })
      .then((authResponse) => authResponse.json())
  }
}
/*
      .then((authResponse) => authResponse.json())
      .then((authResponse) => {
        console.log("from api")
        console.log(authResponse)
        this.setState({ loading: false })
        if (authResponse.error) {
          this.setState({ error: authResponse.error })
        } else {
          this.setState({ loginStatus: c.LOGIN_STATUS_LOGGED })
          AsyncStorage.setItem(c.EMAIL_KEY, email)
          AsyncStorage.setItem(c.PASSWORD_KEY, password)
          AsyncStorage.setItem(c.USER_JWT_TOKEN, authResponse.jwt_token)
          AsyncStorage.setItem(c.USER_ID, authResponse.user.id.toString())
          AsyncStorage.setItem('full_name', authResponse.user.full_name)
        }
      })
      .catch((error) => {
        //this.setState({ error, loading: false })
      })
*/
