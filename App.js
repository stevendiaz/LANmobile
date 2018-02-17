import React from 'react'
import { RootNavigation, navigationMiddleware } from './src/navigation/ReduxNavigation'
import Expo from 'expo'
import ReduxThunk from 'redux-thunk'
import { StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import reducers from './src/reducers'

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

    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, navigationMiddleware))
    return (
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    )
  }
}
