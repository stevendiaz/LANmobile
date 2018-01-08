import React from 'react'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Profile from '../screens/Profile'
import MenuBar from '../components/MenuBar'

const DrawerStack = DrawerNavigator({
  screen1: { screen: Profile },
}, {
  gesturesEnabled: false,
})

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack },
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: '#145991'},
    headerLeft: <MenuBar onPress={() => navigation.navigate('DrawerToggle')}/>,
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
  initialRouteName: 'loginStack',
})

export default AppNavigation
