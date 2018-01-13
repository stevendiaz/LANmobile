import React, { Component } from 'react'
import { AsyncStorage, StyleSheet, Text, View, Image } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect }  from 'react-redux'
import { logoutUser } from '../../actions'
import * as c from '../../constants'
import * as permissions from '../../permissions'
import styles from './styles'

class NavigationDrawer extends Component {
  constructor(props) {
    super(props)
  }

  async _logout() {
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

  renderCreateEvent(screen, screenName) {
    if (permissions.canCreateEvent(this.props.user)) {
      return (
        <Text
          onPress={() => this.props.navigation.navigate('createEvent')}
          style={styles.drawerItem}>
            Create Event
        </Text>
      )
    }
  }

  renderEventList() {
    return (
      <Text
        onPress={() => this.props.navigation.navigate('eventList')}
        style={styles.drawerItem}>
          Events
      </Text>
    )
  }

  renderLogout() {
    return (
      <Text
        onPress={() => this._logout()}
        style={styles.logoutItem}>
          Log Out
      </Text>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        { this.renderEventList() }
        { this.renderCreateEvent() }
        { this.renderLogout() }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, { logoutUser })(NavigationDrawer)
