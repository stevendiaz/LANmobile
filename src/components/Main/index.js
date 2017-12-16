import React, { Component } from 'react'
import { AsyncStorage, StyleSheet, View, KeyboardAvoidingView, Image, Text, Dimensions } from 'react-native'
import * as constants from '../constants'
import Login from '../Login'
import Loading from '../Common/Loading'
import Profile from '../Profile'
import Signup from '../Signup'

/**
 * This is the main component used at app bootstrap. Takes responsability of
 * verifying the authentication status of the user (logged or not logged). If
 * its not logged, it will render the login form, from which the user can
 * input its user and password. In case the user is logged, the app will flow
 * directly to the notifications screen.
 *
 * !Note: Auth data is persisted in AsyncStorage. Check componentDidMount()
 * method to find a way to wipe existing data (for testing purposes).
 *
 * @author Juan Carlos Cancela <juan@schoolinks.com>
 */
export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loginStatus: constants.LOGIN_STATUS_PENDING,
            jwtToken: null,
            error: null
        }
    }

    /**
     * Once component is mounted, it will attempt to get the JWT token that is
     * persisted for already logged in users.
     * Then:
     * -> If an error happens during the process, an error will be propagated
     * -> If there is no authentication key persisted (used is not logged it),
     *    it will set state as not logged.
     * -> If there is a persisted authentication key, it will set state as logged
     *
     * Depending on each of the listed states, this component will redirect app
     * to the Notifications Section -the default section to be displayed when app
     * is started- or to the login form.
     *
     * @author Juan Carlos Cancela <juan@schoolinks.com>
     */
    componentDidMount() {
        try {
            AsyncStorage.getItem(constants.USER_JWT_TOKEN, (error, jwtToken) => {
                if (error) {
                    this.setState({ error })
                }
                if (jwtToken === null) {
                    this.setState({ loginStatus: constants.LOGIN_STATUS_NOT_LOGGED })
                } else {
                    this.setState({ jwtToken }, () => {
                        this.setState({ loginStatus: constants.LOGIN_STATUS_LOGGED })
                    })
                }
            })
        } catch (error) {
            this.setState({ error })
        }
    }

    render() {
        let { loginStatus, error } = this.state

        if (loginStatus === constants.LOGIN_STATUS_PENDING) {
            return (
                <Loading style={s.container} navigation={this.props.navigation} />
            )
        }

        if (loginStatus === constants.LOGIN_STATUS_NOT_LOGGED) {
            return (
                <Login style={s.container} navigation={this.props.navigation} />
            )
        }

        // User is logged in, lets proceed to the app
        // Component rendered on login
        return (
            // Entry point for app<Profile />
            <Profile />
        )
    }
}

const s = StyleSheet.create({
    container: {
        backgroundColor: 'transparent'
    }
})
