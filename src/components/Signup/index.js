import React, { Component } from 'react'
import { TouchableOpacity, Picker, DatePickerIOS, Image, View, Text, KeyboardAvoidingView, Dimensions, TextInput, StatusBar } from 'react-native'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import DatePicker from 'react-native-datepicker'
import ModalDropdown from 'react-native-modal-dropdown'
import styles from './styles'
import * as constants from './constants'
const window = Dimensions.get('window')
const s = styles(window)
const lanCrest = require('../../../resources/images/lan-crest-white.png')
const alert = require('../../../resources/images/alert.png')

export default class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      firstname: '',
      lastname: '',
      graduationDate: undefined,
      concentration: '',
      error: '',
    }
  }

  passwordValidation() {
    if (this.state.password != this.state.confirmPassword) {
      this.setState({ error: 'Passwords must match'})
      return
    }
    if (this.state.password.length < constants.MIN_PASSWORD_LENGTH) {
      this.setState({ error: 'password length must be more than 6' })
      return
    }
  }

  fieldValidation() {
    for(let key of Object.keys(this.state)) {
      if (key != 'error' && key != 'loading' && this.state[key] == '' || this.state[key] == undefined) {
        this.setState({ error: (key + ' field is blank')})
        return
      }
    }
  }

  getSignUpJSON() {
    result = Object.assign({}, this.state)
    result.full_name = result.firstname + " " + result.lastname
    result.username = result.email
    result.graduation_date = result.graduationDate
    result.confirm_password = result.confirmPassword
    result.concentration = constants.labels.concentration.dropdownOptions[result.concentration]
    return JSON.stringify(result)
  }

  _getErrors(authResponse) {
    if (authResponse.non_field_errors) {
      return authResponse.non_field_errors[0]
    }
    else if (authResponse.username && authResponse.username == constants.USERNAME_ERROR_MESSAGE) {
      return authResponse.username[0]
    }
  }

  signUp() {
    this.passwordValidation()
    this.fieldValidation()
    let signUpUrl = 'http://localhost:8000/api/v1/jwt/register/'
    console.log("register json:")
    console.log(this.getSignUpJSON())
    fetch(signUpUrl, {
      method: 'POST',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Content-Type': 'application/json',
      },
      body: this.getSignUpJSON()
    })
      .then((authResponse) => authResponse.json())
      .then((authResponse) => {
        console.log(authResponse)
        errors = this._getErrors(authResponse)
        if (errors) {
          this.setState({ error: errors})
        }
        else {
          console.log("200 OK Redirect to confirmation email view")
        }
      })
      .catch((error) => {
        this.setState({ error, loading: false })
      })
  }

  changeStateByKey(input, inputLabel) {
    this.setState(previousState => {
      previousState[inputLabel] = input
      previousState.error = ''
      return previousState
    })
  }

  renderDateInput(inputLabel, nextInput=null) {
		return (
      <DatePicker
        ref={inputLabel.key}
        style={s.inputDate}
        date={this.state[inputLabel.key]}
				mode="date"
				placeholder={inputLabel.display}
				format="YYYY-MM-DD"
				minDate={constants.MIN_GRADUATION_DATE}
				maxDate={constants.MAX_GRADUATION_DATE}
				confirmBtnText="Confirm"
				cancelBtnText="Cancel"
				customStyles={{ dateInput: s.dateBox, dateText: s.dateText, placeholderText: s.dateText }}
				onDateChange={(date) => {this.changeStateByKey(date, inputLabel.key)}}
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
      <ModalDropdown
        ref={inputLabel.key}
        options={Object.keys(inputLabel.dropdownOptions)}
        defaultValue={inputLabel.display}
        style={s.dropdownInput}
        textStyle={s.dropdownText}
        dropdownStyle={s.dropdownStyle}
        dropdownTextStyle={s.dropdownSelectionStyle}
        onSelect={ (index, value) => {
          this.changeStateByKey(value, inputLabel.key)
          this.refs[nextInput.key].focus()
        }} />
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
    if (this.state.error != '') {
      return (
        <View style={s.errorMessageContainer}>
          <Image source={alert} style={s.errorMessageImg} />
          <Text style={s.errorMessageText}>{this.state.error}</Text>
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
        { this.renderTextInput(constants.labels.firstname, s.inputTextFirst, nextInput=constants.labels.lastname) }
        { this.renderTextInput(constants.labels.lastname, s.inputTextLast, nextInput=constants.labels.email) }
      </View>
    )
  }

  renderTextInput(inputLabel, style, nextInput=null, hideText=false, returnKeyType="next") {
    return (
      <TextInput
        ref={inputLabel.key}
        style={style}
        onChangeText={(input) => this.changeStateByKey(input, inputLabel.key) }
        placeholder={inputLabel.display}
        keyboardType={inputLabel.key == "email" ?  "email-address" : "default" }
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType={returnKeyType}
        placeholderTextColor="rgba(255,255,255,1)"
        onSubmitEditing={() => { inputLabel.key == "confirmPassword" ? dismissKeyboard() : nextInput.key == "graduationDate" ? this.refs[nextInput.key].onPressDate() : this.refs[nextInput.key].focus() }}
        secureTextEntry={hideText}
        selectionColor="white" />
    )
  }

  renderSignupForm() {
    return (
      <View style={s.container}>
        { this.renderLogo() }

        { this.renderNameInputs() }

        { this.renderTextInput(constants.labels.email, s.inputText, nextInput=constants.labels.graduationDate) }

        { this.renderDateInput(constants.labels.graduationDate, nextInput=constants.labels.concentration) }
        { this.renderDropdown(constants.labels.concentration, nextInput=constants.labels.password) }

        { this.renderTextInput(constants.labels.password, s.inputText, nextInput=constants.labels.confirmPassword, hideText=true) }

        { this.renderTextInput(constants.labels.confirmPassword, s.inputText, nextInput=null, hideText=true, returnKeyType="done") }

        { this.renderErrorMessage() }

        { this.renderSignupButton() }
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

