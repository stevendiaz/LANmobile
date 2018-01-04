import React from 'react'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Profile from '../screens/Profile'

const DrawerStack = DrawerNavigator({
  screen1: { screen: Profile },
}, {
  gesturesEndabled: false,
})

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack },
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: '#4C3E54'},
    title: 'Welcome!',
    headerTintColor: 'white',
    gesturesEnabled: false,
  })
})

const LoginStack = StackNavigator({
  Login: { screen: Login },
  Signup: { screen: Signup },
}, {
  headerMode: 'none',
})

const AppNavigation = StackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerNavigation },
}, {
  headerMode: 'none',
})

export default AppNavigation
