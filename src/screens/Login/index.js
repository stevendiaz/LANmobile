import React, { Component } from 'react'
import { AsyncStorage, StyleSheet, View, Image, TextInput, Text, TouchableOpacity, StatusBar, KeyboardAvoidingView, Dimensions } from 'react-native'
import * as c from '../../constants'
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
            hidePassword: true,
            passwordButton: showPasswordButton,
            showOnboardingModal: true
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
              onPress={() => this.props.navigation.navigate('Signup')}>
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
