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
    }
  }

  signUp() {

  }

  changeState(input, inputLabel) {
		this.setState(previousState => {
				previousState[inputLabel] = input
        return previousState
    })
  }

  renderLabel(inputLabel) {
    if (this.state[inputLabel.key]) {
      return (
        <Text style={s.inputLabel}>{inputLabel.display}</Text>
      )
    }
  }

  renderTextInput(inputLabel, hideText=false, returnKeyType="next") {
    return (
      <TextInput
        style={s.inputText}
        onChangeText={(input) => this.changeState(input, inputLabel.key) }
        placeholder={inputLabel.display}
        keyboardType={inputLabel.key == "email" ?  "email-address" : "default" }
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType={returnKeyType}
        placeholderTextColor="rgba(255,255,255,1)"
        onSubmitEditing={() => { inputLabel.key == "confirmPassword" ? dismissKeyboard() : console.log('ere') }}
        secureTextEntry={hideText} />
    )
  }


  renderDateInput(inputLabel) {
		return (
			<DatePicker
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
				onDateChange={(date) => {this.changeState(date, inputLabel.key)}}
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

  renderDropdown(inputLabel) {
    return (
      <ModalDropdown
        options={inputLabel.dropdownOptions}
        defaultValue={inputLabel.display}
        style={s.dropdownInput}
        textStyle={s.dropdownText}
        dropdownStyle={s.dropdownStyle}
        dropdownTextStyle={s.dropdownSelectionStyle}
        onSelect={ (index, value) => { this.changeState(value, inputLabel.key) }} />
    )
  }

  renderSignupButton() {
    return (
      <TouchableOpacity
        style={s.signupBtnContainer}
        onPress={ () => console.log("signup")}>
        <Text style={s.signupBtnText}> Sign up </Text>
      </TouchableOpacity>
    )
  }

  renderSignupForm() {
    return (
      <View style={s.container}>
        { this.renderLogo() }
        { this.renderLabel(constants.labels.fullname) }
        { this.renderTextInput(constants.labels.fullname) }

        { this.renderLabel(constants.labels.nickname) }
        { this.renderTextInput(constants.labels.nickname) }

        { this.renderLabel(constants.labels.email) }
        { this.renderTextInput(constants.labels.email) }

        { this.renderLabel(constants.labels.username) }
        { this.renderTextInput(constants.labels.username) }

        { this.renderLabel(constants.labels.graduationDate) }
        { this.renderDateInput(constants.labels.graduationDate) }

        { this.renderLabel(constants.labels.concentration) }
        { this.renderDropdown(constants.labels.concentration) }

        { this.renderLabel(constants.labels.password) }
        { this.renderTextInput(constants.labels.password, hideText=true) }

        { this.renderLabel(constants.labels.confirmPassword) }
        { this.renderTextInput(constants.labels.confirmPassword, hideText=true, returnKeyType="done") }

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

