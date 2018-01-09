import React, { Component } from 'react'
import { AsyncStorage, StyleSheet, Text, View, Image } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect }  from 'react-redux'
import { logoutUser } from '../../actions'
import * as c from '../../constants'
import styles from './styles'

class NavigationDrawer extends Component {

  async logout() {
    await this._clearStorage()
		const actionToDispatch = NavigationActions.reset({
			index: 0,
			key: null,
			actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
		})
		this.props.navigation.dispatch(actionToDispatch)
    this.props.logoutUser()
	}

  async _clearStorage() {
    await AsyncStorage.removeItem(c.USER_JWT_TOKEN)
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Text
          onPress={() => navigation.navigate('screen1')}
          style={styles.drawerItem}>
          Events
        </Text>
        <Text
          onPress={() => navigation.navigate('screen2')}
          style={styles.drawerItem}>
          Profile
        </Text>
        <Text
          onPress={() => this.logout()}
          style={styles.logoutItem}>
          Log Out
				</Text>
      </View>
    )
  }
}

export default connect(null, { logoutUser })(NavigationDrawer)
