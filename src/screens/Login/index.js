import React, { Component } from 'react'
import { AsyncStorage, StyleSheet, View, Image, TextInput, Text, TouchableOpacity, StatusBar, KeyboardAvoidingView, Dimensions } from 'react-native'
import * as c from '../../constants'
import * as cfg from '../../config'
import { LOG } from '../../utils'
import Profile from '../Profile'
import Signup from '../Signup'
import LoadingScreen from '../../components/Common/LoadingScreen'
import LoginTextInput from '../../components/SignupTextInput'
import RushClosedModal from '../../components/RushClosedModal'
import SignupCompleteModal from '../../components/SignupCompleteModal'
import dismissKeyboard from 'react-native-dismiss-keyboard';
import styles from './styles'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, loginUser, loginPersistedUser, toggleRushModal } from '../../actions'
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
      jwtToken: null,
      hidePassword: true,
      passwordButton: hidePasswordButton,
      loading: true,
    }
    this.togglePasswordHide = this.togglePasswordHide.bind(this);
  }

    /**
     * This method is in charge of attempting to authenticate user with the
     * given credentials and persist the login data in the app in case of
     * success. If authentication attempt fails, it will properly propagate
     * the error.
     */
    async login() {
      this.props.loginUser(this.props.email, this.props.password)
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
        if (this.props.email) {
            return (
                <Text style={s.loginInputLabel}>Email</Text>
            )
        }
    }

    /**
     * Method in charge of rendering the password label
     */
    renderPasswordLabel() {
        if (this.props.password) {
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

    async _writePersistedJwtToken(jwtResponse) {
      if (jwtResponse.jwt_token) {
        this.setState({ jwtToken: jwtResponse.jwt_token })
        await AsyncStorage.setItem(c.USER_JWT_TOKEN, jwtResponse.jwt_token)
      }
    }

    async _refreshAndLoginUser(jwtToken) {
      jwtRefreshResponse = await new Api().refreshUserToken(jwtToken)
      await this._writePersistedJwtToken(jwtRefreshResponse)
      this.props.loginPersistedUser(jwtRefreshResponse)
      this.props.navigation.navigate('drawerStack')
      this.setState({ loading: false })
    }

    async componentWillMount() {
      try {
        let jwtToken = await AsyncStorage.getItem(c.USER_JWT_TOKEN)
        jwtToken ? this._refreshAndLoginUser(jwtToken) : this.setState({ loading: false })
      } catch (error) {
        this.setState({ loading: false })
      }
    }

    togglePasswordHide() {
        this.setState({
            hidePassword: this.state.hidePassword ? false : true,
            passwordButton: this.state.hidePassword ? showPasswordButton : hidePasswordButton
        })
    }

    renderSignUpText() {
      const signUpText = "Don't have an account? Sign up here"
      return (
          <TouchableOpacity
              style={s.signUpView}
              onPress={() => this._isRushOpen()}>
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

    renderEmailInput() {
      return (
        <LoginTextInput
          style={s.loginInputText}
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
          placeholder="Email"
          keyboardType="email-address"
          secureTextEntry={false}
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          />
      )
    }

    renderPasswordInput() {
      return (
        <LoginTextInput
          style={s.loginInputText}
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
          placeholder="Password"
          keyboardType="default"
          secureTextEntry={this.state.hidePassword}
          returnKeyType="next"
          onSubmitEditing={() => dismissKeyboard()}
          />
      )
    }

    renderPasswordField() {
      return (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 10 }}>
            {this.renderPasswordInput()}
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={s.hidePasswordButton}
              onPress={() => this.togglePasswordHide()}>
              <Image source={this.state.passwordButton} style={s.passwordButton} />
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    renderLogo() {
      return (
        <View style={s.logoContainer}>
          <Image resizeMode="contain" style={s.lanCrest} source={lanCrest} />
        </View>
      )
    }

	  renderRushClosedModal() {
      if (this.props.showRushModal) return <RushClosedModal/>
    }

    renderSignupCompleteModal() {
      if (this.props.showSignupCompleteModal) return <SignupCompleteModal/>
    }

    async _isRushOpen() {
      let isRushOpen = await new Api().isRushOpen()
      isRushOpen ? this.props.navigation.navigate('Signup') : this.props.toggleRushModal(true)
    }

    render() {
        let { loginStatus, error, showOnboardingModal } = this.state
        if (!this.state.loading) {
            return (
                <KeyboardAvoidingView behavior="position" style={s.keyboardContainer}>
                    <View style={s.container}>
                        {this.renderLogo()}
                        {this.renderEmailLabel()}
                        {this.renderEmailInput()}
                        {this.renderPasswordLabel()}
                        {this.renderPasswordField()}
                        {this.renderLoadingMessage()}
                        {this.renderLoginButton()}
                        {this.renderSignUpText()}
                        {this.renderErrorMessage()}
                        {this.renderRushClosedModal()}
                        {this.renderSignupCompleteModal()}
                    </View>
                </KeyboardAvoidingView>
            )
        } else {
          return (
            <LoadingScreen/>
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
    showRushModal: state.auth.showRushModal,
    showSignupCompleteModal: state.auth.showSignupCompleteModal,
  }
}

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginUser,
    loginPersistedUser,
    toggleRushModal,
  })(Login)
