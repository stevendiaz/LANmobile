import React from 'react'
import Main from './src/components/Main'
import Login from './src/components/Login'
import Expo from 'expo'
import ReduxThunk from 'redux-thunk'
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './src/reducers'

/**
 * Configuration options for the root StackNavigator component, responible of
 * handling routing of application sections.
 * @headerMode: Parameter to determine whether or not navigable sections
 * should include the default nav bar.
 */
const navigatorOptions = {
  headerMode: 'none'
}

/**
 * On this constant, its defined the different sections to which the app
 * can navigate.
 */
const AppNavigator = StackNavigator({
  Main: { screen: Main },
  Login: { screen: Login },
}, navigatorOptions)

/**
 * Application entry point.
 */
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isReady: true })
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />
    }

    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}
