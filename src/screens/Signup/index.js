import React, { Component } from 'react'
import { TouchableOpacity, Picker, DatePickerIOS, Image, View, Text, KeyboardAvoidingView, Dimensions, TextInput, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { setSignupFormValue, signupUser } from '../../actions'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import DateInput from '../../components/DateInput'
import Dropdown from '../../components/Dropdown'
import SignupTextInput from '../../components/SignupTextInput'
import styles from './styles'
import * as constants from '../../constants'
const inputProps = constants.inputProps
const window = Dimensions.get('window')
const s = styles(window)
const lanCrest = require('../../../resources/images/lan-crest-white.png')
const alert = require('../../../resources/images/alert.png')

class Signup extends Component {
  constructor(props) {
    super(props)

    this.onFieldChange.bind(this)
  }

  signUp() {
    this.props.signupUser(this.props)
  }

  renderDateInput(inputLabel, nextInput=null) {
		return (
      <DateInput
        ref={inputLabel.key}
        date={this.props[inputLabel.key]}
        placeholder={inputLabel.display}
				onDateChange={(date) => {
          this.onFieldChange(inputLabel.key, date)
        }}
      />
    )
	}

  renderLogo() {
    return (
      <View style={s.logoContainer}>
        <Image resizeMode="contain" style={s.lanCrest} source={lanCrest}/>
      </View>
    )
  }

  renderDropdown(inputLabel, nextInput=null) {
    return (
      <Dropdown
        ref={inputLabel.key}
        options={Object.keys(inputLabel.dropdownOptions)}
        defaultValue={inputLabel.display}
        onSelect={ (index, value) => {
          this.onFieldChange(inputLabel.key, value)
          this.refs[nextInput.key].focus()
        }}
      />
    )
  }

  renderSignupButton() {
    return (
      <TouchableOpacity
        style={s.signupBtnContainer}
        onPress={ () => this.signUp()}>
        <Text style={s.signupBtnText}> Sign up </Text>
      </TouchableOpacity>
    )
  }

  renderErrorMessage() {
    if (this.props.error) {
      return (
        <View style={s.errorMessageContainer}>
          <Image source={alert} style={s.errorMessageImg} />
          <Text style={s.errorMessageText}>{this.props.error}</Text>
        </View>
      )
    }
    else {
      return (
        <Text/>
      )
    }
  }

  renderNameInputs() {
    return (
      <View style={{flexDirection: 'row'}}>
        { this.renderTextInput(inputProps.firstname, s.inputTextFirst, nextInput=inputProps.lastname) }
        { this.renderTextInput(inputProps.lastname, s.inputTextLast, nextInput=inputProps.email) }
      </View>
    )
  }

  onFieldChange(key, value) {
    this.props.setSignupFormValue({key, value})
  }

  onSubmitEditing(currentInput, nextInput) {
    confirmPassword = inputProps.confirmPassword.key
    graduationDate = inputProps.graduationDate.key
    if (currentInput.key == confirmPassword) {
      dismissKeyboard()
    }
    else {
      nextInput.key == graduationDate ? this.refs[nextInput.key].onPressDate() : this.refs[nextInput.key].focus()
    }
  }

  renderTextInput(inputLabel, style, nextInput=null, hideText=false, returnKeyType="next") {
    return (
      <SignupTextInput
        ref={inputLabel.key}
        style={style}
        onChangeText={(input) => this.onFieldChange(inputLabel.key, input) }
        value={this.props[inputLabel.key]}
        placeholder={inputLabel.display}
        keyboardType={inputLabel.key == inputProps.email.key ?  "email-address" : "default" }
        returnKeyType={returnKeyType}
        onSubmitEditing={(event) => this.onSubmitEditing(inputLabel, nextInput)}
        secureTextEntry={hideText}
        />
    )
  }

  renderLoginText() {
    const loginText = "Have an account already? Log in here"
    return (
      <TouchableOpacity
        style={s.loginView}
        onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={s.loginText}>{loginText}</Text>
      </TouchableOpacity>
    )
  }

  renderSignupForm() {
    return (
      <View style={s.container}>
        { this.renderLogo() }
        { this.renderNameInputs() }
        { this.renderTextInput(inputProps.email, s.inputText, nextInput=inputProps.graduationDate) }
        { this.renderDateInput(inputProps.graduationDate, nextInput=inputProps.concentration) }
        { this.renderDropdown(inputProps.concentration, nextInput=inputProps.password) }
        { this.renderTextInput(inputProps.password, s.inputText, nextInput=inputProps.confirmPassword, hideText=true) }
        { this.renderTextInput(inputProps.confirmPassword, s.inputText, nextInput=null, hideText=true, returnKeyType="done") }
        { this.renderErrorMessage() }
        { this.renderSignupButton() }
        { this.renderLoginText() }
      </View>
    )
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="position" style={s.keyboardContainer}>
        <StatusBar barStyle="light-content" />
        { this.renderSignupForm() }
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = state => {
  return {
    email: state.signup.email,
    password: state.signup.password,
    confirmPassword: state.signup.confirmPassword,
    firstname: state.signup.firstname,
    lastname: state.signup.lastname,
    concentration: state.signup.concentration,
    error: state.signup.error,
    graduationDate: state.signup.graduationDate,
    loading: state.signup.loading,
  }
}

export default connect(mapStateToProps, { setSignupFormValue, signupUser })(Signup)
