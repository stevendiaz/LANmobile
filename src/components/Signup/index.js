import React, { Component } from 'react'
import { TouchableOpacity, Picker, DatePickerIOS, Image, View, Text, KeyboardAvoidingView, Dimensions, TextInput, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { setSignupFormValue, signupUser } from '../../actions'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import DatePicker from 'react-native-datepicker'
import ModalDropdown from 'react-native-modal-dropdown'
import styles from './styles'
import * as constants from '../constants'
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
      <DatePicker
        ref={inputLabel.key}
        style={s.inputDate}
        date={this.props[inputLabel.key]}
				mode="date"
				placeholder={inputLabel.display}
				format="YYYY-MM-DD"
				minDate={constants.MIN_GRADUATION_DATE}
				maxDate={constants.MAX_GRADUATION_DATE}
				confirmBtnText="Confirm"
				cancelBtnText="Cancel"
				customStyles={{ dateInput: s.dateBox, dateText: s.dateText, placeholderText: s.dateText }}
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
      <ModalDropdown
        ref={inputLabel.key}
        options={Object.keys(inputLabel.dropdownOptions)}
        defaultValue={inputLabel.display}
        style={s.dropdownInput}
        textStyle={s.dropdownText}
        dropdownStyle={s.dropdownStyle}
        dropdownTextStyle={s.dropdownSelectionStyle}
        onSelect={ (index, value) => {
          this.onFieldChange(inputLabel.key, value)
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
        { this.renderTextInput(constants.labels.firstname, s.inputTextFirst, nextInput=constants.labels.lastname) }
        { this.renderTextInput(constants.labels.lastname, s.inputTextLast, nextInput=constants.labels.email) }
      </View>
    )
  }

  onFieldChange(key, value) {
    this.props.setSignupFormValue({key, value})
  }

  renderTextInput(inputLabel, style, nextInput=null, hideText=false, returnKeyType="next") {
    return (
      <TextInput
        ref={inputLabel.key}
        style={style}
        onChangeText={(input) => this.onFieldChange(inputLabel.key, input) }
        value={this.props[inputLabel.key]}
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
