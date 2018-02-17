import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { connect } from 'react-redux'
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import AppNavigation from './AppNavigation'

export const navigationMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
)
const addListener = createReduxBoundAddListener('root')

function ReduxNavigation (props) {
  const navigation = addNavigationHelpers({
    dispatch: props.dispatch,
    state: props.nav,
    addListener,
  })
  return <AppNavigation navigation={navigation} />
}

const mapStateToProps = state => ({
  nav: state.nav
})

export const RootNavigation = connect(mapStateToProps)(ReduxNavigation)
