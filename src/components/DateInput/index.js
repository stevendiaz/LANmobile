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
    let { date, placeholder, onDateChange } = this.props
    return (
      <DatePicker
        date={date}
        placeholder={placeholder}
        onDateChange={onDateChange}
        mode="date"
        format="YYYY-MM-DD"
        minDate={MIN_GRADUATION_DATE}
        maxDate={MAX_GRADUATION_DATE}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
				customStyles={{
          dateInput: s.dateBox,
          dateText: s.dateText,
          placeholderText: s.dateText
        }}
        style={s.inputDate}
        />
    )
  }

}
