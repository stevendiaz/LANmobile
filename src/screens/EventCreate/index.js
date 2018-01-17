import React, { Component } from 'react'
import { View, TouchableOpacity, Text,  Dimensions } from 'react-native'
import DateInput from '../../components/DateInput'
import FormTextInput from '../../components/FormTextInput'
import { connect } from 'react-redux'
import { setEventFormValue, setDateValue, createEvent } from '../../actions'
import { colors, DATETIME_FORMAT } from '../../constants'
import Spinner from 'react-native-loading-spinner-overlay'
import styles from './styles'
import moment from 'moment'
const window = Dimensions.get('window')
const s = styles(window)


class EventCreate extends Component {
  constructor(props) {
    super(props)
  }

  _onFieldChange(key, value) {
    this.props.setEventFormValue({key, value})
  }

  _onDateChange(date) {
    this.props.setDateValue(date)
  }

  _createEvent() {
    this.props.createEvent(this.props, this.props.jwtToken)
  }

  _renderTitleInput() {
    return (
      <View>
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
      </View>
    )
  }

  _renderLocationInput() {
    return (
      <View>
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
      </View>
    )
  }

  _renderDateInput() {
    return (
      <View>
        <DateInput
          format={DATETIME_FORMAT}
          placeholder='Event Date'
          dark={true}
          onDateChange={(date) => this._onDateChange(date)}
          date={this.props.datetime ? this.props.datetime.toDate() : ''}/>
      </View>
    )
  }

  _renderCreateEventButton() {
    return (
      <TouchableOpacity
        style={s.createEventContainer}
        onPress={ () => this._createEvent()}>
          <Text style={s.createEventText}> Create Event </Text>
      </TouchableOpacity>
    )
  }

  _renderLoadingText() {
    return (
      <View style={s.loadingContainer}>
        <Text style={s.loadingLabel}>Loading...</Text>
      </View>
    )
  }

  _renderLoading() {
    if (this.props.loading) {
      return this._renderLoadingText()
    } else {
      return <View style={s.loadingContainer}/>
    }
  }

  render() {
    return (
      <View style={s.container}>
        { this._renderTitleInput() }
        { this._renderLocationInput() }
        { this._renderDateInput() }
        { this._renderLoading() }
        { this._renderCreateEventButton() }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    location: state.events.location,
    title: state.events.title,
    datetime: state.events.datetime,
    loading: state.events.loading,
    jwtToken: state.auth.jwtToken,
  }
}

export default connect(mapStateToProps, {
  setEventFormValue,
  createEvent,
  setDateValue,
})(EventCreate)
