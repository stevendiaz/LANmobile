import React from 'react'
import { TextInput } from 'react-native'

export default class SignupTextInput extends TextInput {
  constructor(props) {
    super(props)
  }

  render() {
    let {
      style,
      onChangeText,
      value,
      placeholder,
      keyboardType,
      returnKeyType,
      secureTextEntry,
      onSubmitEditing,
    } = this.props
    return (
      <TextInput
        style={style}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
        placeholderTextColor="rgba(255,255,255,1)"
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        selectionColor="white" />

    )
  }
}
