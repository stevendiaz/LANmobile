import React, { Component } from 'react'
import { View, TouchableOpacity, Text,  Dimensions } from 'react-native'
import DateInput from '../../components/DateInput'
import FormTextInput from '../../components/FormTextInput'
import { connect } from 'react-redux'
import { setEventFormValue } from '../../actions'
import styles from './styles'
const window = Dimensions.get('window')
const s = styles(window)


class EventCreate extends Component {
  constructor(props) {
    super(props)
  }

  _onFieldChange(key, value) {
    this.props.setEventFormValue({key, value})
  }

  render() {
    return (
      <View style={s.container}>
        <FormTextInput
          style={s.inputText}
          onChangeText={(input) => this._onFieldChange('title', input)}
          value={this.props.title}
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
          onChangeText={(input) => this._onFieldChange('location', input)}
          value={this.props.location}
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
          onDateChange={(date) => this._onFieldChange('datetime', date)}
          date={this.props.datetime}/>
        <TouchableOpacity
          style={s.createEventContainer}
          onPress={ () => console.log('signup')}>
            <Text style={s.createEventText}> Create Event </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    location: state.events.location,
    title: state.events.title,
    datetime: state.events.datetime,
  }
}

export default connect(mapStateToProps, {
  setEventFormValue,
})(EventCreate)
