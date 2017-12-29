import React from 'react'
import { Dimensions } from 'react-native'
import DatePicker from 'react-native-datepicker'
import ModalDropdown from 'react-native-modal-dropdown'
import styles from './styles'
const window = Dimensions.get('window')
const s = styles(window)

export default class Dropdown extends ModalDropdown {
  constructor(props) {
    super(props)
  }

  render() {
    let { options, defaultValue, onSelect } = this.props
    return (
      <ModalDropdown
        options={options}
        defaultValue={defaultValue}
        onSelect={onSelect}
        style={s.dropdownInput}
        textStyle={s.dropdownText}
        dropdownStyle={s.dropdownStyle}
        dropdownTextStyle={s.dropdownSelectionStyle}
      />
    )
  }
}
