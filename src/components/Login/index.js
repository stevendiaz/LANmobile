import React, { Component } from 'react'
import { AsyncStorage, StyleSheet, View, Image, TextInput, Text, TouchableOpacity, StatusBar, KeyboardAvoidingView, Dimensions } from 'react-native'
import * as c from '../constants'
import * as cfg from '../../config'
import { LOG } from '../../utils'
import Profile from '../Profile'
import Signup from '../Signup'
import dismissKeyboard from 'react-native-dismiss-keyboard';
import styles from './styles'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, loginUser } from '../../actions'
import Api from '../../api'

const window = Dimensions.get('window')
const s = styles(window)
const alert = require('../../../resources/images/alert.png')
const lanCrest = require('../../../resources/images/lan-crest-white.png')
const showPasswordButton = require('../../../resources/images/password-show.png')
const hidePasswordButton = require('../../../resources/images/password-hide.png')

/**
 * Login component, responsible to handle the authentication of user. It 
 * will ask user for email and password. In case combination is valid, it 
 * will persist authentication response on AsynsStorage and 
 * redirect user to Notifications List. 
 * If given email and password are invalid, it'll display an error message.
 * 
 */
class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loginStatus: c.LOGIN_STATUS_PENDING,
            loading: false,
            email: '',
            password: '',
            hidePassword: true,
            passwordButton: showPasswordButton,
            error: null,
            showOnboardingModal: true
        }
        this.togglePasswordHide = this.togglePasswordHide.bind(this);
    }

    /**
     * Given the authentication login response, extracts the corresponding
     * user id.
     * @param {*} authResponse the authentication login reponse
     * @return the user id, or 0 if auth response is null or does not have
     * a user id
     */
    getUserId(authResponse) {
        if (!authResponse) return 0

        if (authResponse.user['Student']) return `student:${authResponse.user['Student'].id}`
        if (authResponse.user['SchoolAdminId']) return `school_admin:${authResponse.user['SchoolAdminId']}`
        if (authResponse.user['Guardian']) return `guardian:${authResponse.user['Guardian'].id}`

        return 0
    }

    /**
     * This method is in charge of attempting to authenticate user with the
     * given credentials and persist the login data in the app in case of
     * success. If authentication attempt fails, it will properly propagate
     * the error.
     */
    async login() {
        let { email, password, loading } = this.state
        this.setState({ error: null })
        this.setState({ loading: true })
        this.props.loginUser(this.props.email, this.props.password)
        //let loginUrl = `${cfg.LOGIN_URL}?access_token=${cfg.ACCESS_TOKEN}&User[login_email]=${email}&User[login_password]=${password}`
        let loginUrl = 'http://localhost:8000/api/v1/jwt/login/'
        fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Authorization': 'Basic ' + cfg.LOGIN_SERVER_PASSWORD,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'username': this.props.email, 'password': this.props.password })
        })
            .then((authResponse) => authResponse.json())
            .then((authResponse) => {
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
                this.setState({ error, loading: false })
            })
    }

    /**
     * Method in charge of rendering an error message to be displayed in case
     * the authentication attempt was unsuccessful.
     * 
     * @param {*} error the error propagated from the login attempt
     */
    renderErrorMessage(error) {
      if (this.props.error) {
        return (
          <View style={s.errorMessageContainer}>
            <Image source={alert} style={s.errorMessageImg} />
            <Text style={s.errorMessageText}>{this.props.error}</Text>
          </View>
        )
      }
      return (
        <Text />
      )
    }

    /**
     * Method in charge of rendering the email label
     */
    renderEmailLabel() {
        if (this.state.email) {
            return (
                <Text style={s.loginInputLabel}>Email</Text>
            )
        }
    }

    /**
     * Method in charge of rendering the password label
     */
    renderPasswordLabel() {
        let { password } = this.state
        if (password) {
            return (
                <Text style={s.loginInputLabel}>Password</Text>
            )
        }
    }

    /**
     * Method in charge of rendering the loading message
     */
    renderLoadingMessage() {
        if (this.props.loading) {
            return (
                <Text style={s.loadingLabel}>Loading...</Text>
            )
        }
    }

    async componentWillMount() {
        let showOnboardingModal = await AsyncStorage.getItem(c.ONBOARDING_VISIBLE)
        if (showOnboardingModal) {
            this.setState({ showOnboardingModal })
        } else {
            this.setState({ showOnboardingModal: false })
        }
    }

    togglePasswordHide() {
        this.setState({
            hidePassword: this.state.hidePassword ? false : true,
            passwordButton: this.state.hidePassword ? hidePasswordButton : showPasswordButton
        })
    }

    renderSignUpText() {
      const signUpText = "Don't have an account? Sign up here"
      return (
          <TouchableOpacity
              style={s.signUpView}
              onPress={() => console.log('pressed')}>
                  <Text style={s.signUpText}>{signUpText}</Text>
          </TouchableOpacity>
      )
    }

    renderLoginButton() {
      return (
				<TouchableOpacity
    				style={s.loginBtnContainer}
    				onPress={this.onLoginButtonPress.bind(this)} >
    						<Text style={s.loginBtnText}> Login to TexasLAN </Text>
				</TouchableOpacity>
			)
    }

    onEmailChange(text) {
      this.props.emailChanged(text)
    }

    onPasswordChange(text) {
      this.props.passwordChanged(text)
    }

    onLoginButtonPress() {
      const { email, password } = this.props
      this.props.loginUser({ email, password })
    }

    render() {
        let { loginStatus, error, showOnboardingModal } = this.state
        if (loginStatus === c.LOGIN_STATUS_PENDING) {
            return (
                <KeyboardAvoidingView behavior="position" style={s.keyboardContainer}>
                    <View style={s.container}>
                        <View style={s.logoContainer}>
                            <Image resizeMode="contain" style={s.lanCrest} source={lanCrest} />
                        </View>

                        <StatusBar barStyle="light-content" />

                        {this.renderEmailLabel()}
                        <TextInput
                            style={s.loginInputText}
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                            placeholder="Email"
                            keyboardType="email-address"
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onSubmitEditing={() => this.passwordInput.focus()}
                            placeholderTextColor="rgba(255,255,255,1)" />

                        {this.renderPasswordLabel()}

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 10 }}>
                                <TextInput
                                    style={s.loginInputText}
                                    onChangeText={this.onPasswordChange.bind(this)}
                                    placeholder="Password"
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="rgba(255,255,255,1)"
                                    value={this.props.password}
                                    ref={(input) => this.passwordInput = input}
                                    returnKeyType="done"
                                    onSubmitEditing={() => dismissKeyboard()}
                                    secureTextEntry={this.state.hidePassword} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    style={s.hidePasswordButton}
                                    onPress={() => this.togglePasswordHide()}>
                                    <Image source={this.state.passwordButton} style={s.passwordButton} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {this.renderLoadingMessage()}
                        {this.renderLoginButton()}
                        {this.renderSignUpText()}
                        {this.renderErrorMessage()}
                    </View>
                </KeyboardAvoidingView>
            )
        } else {
            return (
            	<Profile/>
            )
        }
    }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
  }
}

export default connect(mapStateToProps, {
    emailChanged, passwordChanged, loginUser
  })(Login)
