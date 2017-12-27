import React, { Component } from 'react'
import { AsyncStorage, View, Text } from 'react-native'
import * as c from '../constants'

export default class Profile extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: 'default email',
      full_name: 'default name',
    }
  }

  async getUserFromStorage() {
    let email = await AsyncStorage.getItem(c.EMAIL_KEY)
    let full_name = await AsyncStorage.getItem('full_name')
    this.setState({
      email: email,
      full_name: full_name,
    })
  }

  logout() {
    AsyncStorage.removeItem(c.EMAIL_KEY)
    AsyncStorage.removeItem(c.PASSWORD_KEY)
    AsyncStorage.removeItem(c.USER_JWT_TOKEN)
    AsyncStorage.removeItem(c.USER_ID)
    AsyncStorage.removeItem('full_name')
  }

  render() {
		displayString = this.state.email + " " + this.state.full_name
    this.getUserFromStorage()
    this.logout()
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height: window.height, padding: 20, paddingBottom: 250, backgroundColor: 'grey'}}>
        <Text>{displayString}</Text>
      </View>
    )

  }
}
