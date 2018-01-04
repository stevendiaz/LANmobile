import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'

function ReduxNavigation (props) {
  const navigation = addNavigationHelpers({
    dispatch: props.dispatch,
    state: props.nav,
  })
  return <AppNavigation navigation={navigation} />
}

const mapStateToProps = state => ({
  nav: state.nav
})

export default connect(mapStateToProps)(ReduxNavigation)
