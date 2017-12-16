import React, { Component } from 'react'
import { View, Text, KeyboardAvoidingView, Dimensions, TextInput, StatusBar } from 'react-native'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import styles from './styles'
import * as constants from './constants'
const window = Dimensions.get('window')
const s = styles(window)

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
    }
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


  renderGraduationDateInput() {
  }

  renderConcentrationInput() {
  }

  renderGenderInput() {
  }

  renderSignupForm() {
    return (
      <View style={s.container}>
        { this.renderLabel(constants.labels.fullname) }
        { this.renderTextInput(constants.labels.fullname) }

        { this.renderLabel(constants.labels.nickname) }
        { this.renderTextInput(constants.labels.nickname) }

        { this.renderLabel(constants.labels.username) }
        { this.renderTextInput(constants.labels.username) }

        { this.renderLabel(constants.labels.password) }
        { this.renderTextInput(constants.labels.password, hideText=true) }

        { this.renderLabel(constants.labels.confirmPassword) }
        { this.renderTextInput(constants.labels.confirmPassword, hideText=true, returnKeyType="done") }
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

