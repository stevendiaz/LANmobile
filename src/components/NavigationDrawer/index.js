import React, { Component } from 'react'
import { AsyncStorage, StyleSheet, Text, View, Image } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect }  from 'react-redux'
import { logoutUser } from '../../actions'
import * as c from '../../constants'

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
          style={styles.uglyDrawerItem}>
          Screen 1
        </Text>
        <Text
          onPress={() => navigation.navigate('screen2')}
          style={styles.uglyDrawerItem}>
          Screen 2
        </Text>
        <Text
          onPress={() => navigation.navigate('screen3')}
          style={styles.uglyDrawerItem}>
          Screen 3
        </Text>
        <Text
          onPress={() => this.logout()}
          style={styles.uglyDrawerItem}>
          Log Out
				</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingTop: 40,
    paddingHorizontal: 20
  },
  uglyDrawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E73536',
    padding: 15,
    margin: 5,
    borderRadius: 2,
    borderColor: '#E73536',
    borderWidth: 1,
    textAlign: 'center'
  }
})

export default connect(null, { logoutUser })(NavigationDrawer)
