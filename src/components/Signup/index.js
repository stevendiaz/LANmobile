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
      fullname: '',
      nickname: '',
      username: '',
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
      if (key != 'error' && this.state[key] == '' || this.state[key] == undefined) {
        this.setState({ error: (key + ' field is blank')})
        return
      }
    }
  }

  signUp() {
    this.passwordValidation()
    this.fieldValidation()
    console.log('end of signup validation')
  }

  changeStateByKey(input, inputLabel) {
		this.setState(previousState => {
				previousState[inputLabel] = input
        previousState.error = ''
        return previousState
    })
  }

  renderTextInput(inputLabel, nextInput=null, hideText=false, returnKeyType="next") {
    return (
      <TextInput
        ref={inputLabel.key}
        style={s.inputText}
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
        options={inputLabel.dropdownOptions}
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

  renderSignupForm() {
    return (
      <View style={s.container}>
        { this.renderLogo() }
        { this.renderTextInput(constants.labels.fullname, nextInput=constants.labels.nickname) }

        { this.renderTextInput(constants.labels.nickname, nextInput=constants.labels.email) }

        { this.renderTextInput(constants.labels.email, nextInput=constants.labels.username) }

        { this.renderTextInput(constants.labels.username, nextInput=constants.labels.graduationDate) }

        { this.renderDateInput(constants.labels.graduationDate, nextInput=constants.labels.concentration) }

        { this.renderDropdown(constants.labels.concentration, nextInput=constants.labels.password) }

        { this.renderTextInput(constants.labels.password, nextInput=constants.labels.confirmPassword, hideText=true) }

        { this.renderTextInput(constants.labels.confirmPassword, nextInput=null, hideText=true, returnKeyType="done") }

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

