import React from 'react'
import { TextInput } from 'react-native'

export default class FormTextInput extends TextInput {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TextInput
        style={this.props.style}
        onChangeText={this.props.onChangeText}
        value={this.props.value}
        placeholder={this.props.placeholder}
        keyboardType={this.props.keyboardType}
        returnKeyType={this.props.returnKeyType}
        onSubmitEditing={this.props.onSubmitEditing}
        secureTextEntry={this.props.secureTextEntry}
        autoCorrect={false}
        placeholderTextColor={this.props.placeholderTextColor}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        selectionColor={this.props.selectionColor} />
    )
  }
}
