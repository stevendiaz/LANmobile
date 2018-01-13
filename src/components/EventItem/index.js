import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableHighlight } from 'react-native';
import styles from './styles'
import { getFormattedMMDD } from '../../utils'
const window = Dimensions.get('window')
const s = styles(window)
const calIcon = require('../../../resources/images/calendar.png')

export default class EventItem extends Component {
  constructor(props) {
    super(props)
  }

  _formatDate(date) {
    if (!date) return ('N/A')
    date = new Date(date.split(' ')[0])
    return getFormattedMMDD(date)
  }

  _renderCalendarIcon() {
    return (
      <View style={s.iconContainer}>
        <Image source={calIcon} style={s.icon} />
      </View>
    )
  }

  _renderEventInfo() {
    return (
      <View style={s.eventInfo}>
        <View style={s.eventDetail}>
          <Text style={s.eventTitleText}>{ this.props.title }</Text>
        </View>
        <View style={s.eventDetail}>
          <Text style={s.eventLocationText}>{ this.props.location }</Text>
        </View>
      </View>
    )
  }

  _renderDate() {
    return (
      <View style={s.date}>
        <Text style={s.dateText}>{ this._formatDate(this.props.date) }</Text>
      </View>
    )
  }

  render() {
    return (
      <TouchableHighlight>
        <View style={s.container}>
          { this._renderCalendarIcon() }
          { this._renderEventInfo() }
          { this._renderDate() }
        </View>
      </TouchableHighlight>
    )
  }
}
