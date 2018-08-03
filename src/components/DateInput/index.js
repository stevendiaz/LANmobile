import React from 'react'
import { Dimensions } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { MIN_GRADUATION_DATE, MAX_GRADUATION_DATE } from '../../constants'
import styles from './styles'
const window = Dimensions.get('window')
const s = styles(window)

export default class DateInput extends DatePicker {
  constructor(props) {
    super(props)
  }

  render() {
    let { date, placeholder, onDateChange, dark } = this.props
    let style = dark ? s.inputDateDark : s.inputDateLight
    let text = dark ? s.dateTextDark : s.dateTextLight
    let format = this.props.format ? this.props.format : "YYYY-MM-DD"
    let mode = this.props.mode ? this.props.mode : "date"
    return (
      <DatePicker
        date={date}
        placeholder={placeholder}
        onDateChange={onDateChange}
        mode={mode}
        format={format}
        minDate={MIN_GRADUATION_DATE}
        maxDate={MAX_GRADUATION_DATE}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
				customStyles={{
          dateInput: s.dateBox,
          dateText: text,
          placeholderText: text,
        }}
        style={style}
        />
    )
  }

}
