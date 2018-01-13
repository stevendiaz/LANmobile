import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import DateInput from '../../components/DateInput'
import SignupTextInput from '../../components/SignupTextInput'
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
        <SignupTextInput
          style={{}}
          onChangeText={(input) => console.log('input')}
          value={''}
          placeholder='Event Title'
          keyboardType='default'
          returnKeyType='next'
          secureTextEntry={false}
          onSubmitEditing={(event) => console.log('submit')}
        />
        <DateInput
          placeholder='Event Date'
          onDateChange={() => console.log('date changed')}
          date={''}/>
        <DateInput
          placeholder='Event Time'
          onDateChange={() => console.log('date changed')}
          date={''}/>
      </View>
    )
  }
}

export default connect()(EventCreate)
