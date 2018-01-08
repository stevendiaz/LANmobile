import React, { Component }from 'react'
import { View, Image, Dimensions, TouchableOpacity } from 'react-native'
import styles from './styles'
const window = Dimensions.get('window')
const s = styles(window)
const menuBar = require('../../../resources/images/menu.png')

export default class MenuBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { onPress } = this.props
    return (
      <TouchableOpacity onPress={onPress} style={s.imageContainer}>
        <Image source={menuBar} style={s.menuBarImage}/>
      </TouchableOpacity>
    )
  }
}
