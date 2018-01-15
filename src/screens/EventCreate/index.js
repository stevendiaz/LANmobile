import React, { Component } from 'react'
import { View, TouchableOpacity, Text,  Dimensions } from 'react-native'
import DateInput from '../../components/DateInput'
import FormTextInput from '../../components/FormTextInput'
import { connect } from 'react-redux'
import styles from './styles'
const window = Dimensions.get('window')
const s = styles(window)


class EventCreate extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={s.container}>
        <FormTextInput
          style={s.inputText}
          onChangeText={(input) => console.log('input')}
          value={''}
          placeholder='Event Title'
          keyboardType='default'
          returnKeyType='next'
          secureTextEntry={false}
          onSubmitEditing={(event) => console.log('submit')}
          placeholderTextColor='#444444'
          selectionColor='#444444'
        />
        <FormTextInput
          style={s.inputText}
          onChangeText={(input) => console.log('input')}
          value={''}
          placeholder='Location'
          keyboardType='default'
          returnKeyType='next'
          secureTextEntry={false}
          onSubmitEditing={(event) => console.log('submit')}
          placeholderTextColor='#444444'
          selectionColor='#444444'
        />
        <DateInput
          placeholder='Event Date'
          dark={true}
          onDateChange={() => console.log('date changed')}
          date={''}/>
        <TouchableOpacity
          style={s.createEventContainer}
          onPress={ () => console.log('signup')}>
            <Text style={s.createEventText}> Create Event </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect()(EventCreate)
