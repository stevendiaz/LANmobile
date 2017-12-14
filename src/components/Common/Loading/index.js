import React, { Component } from 'react'
import { StyleSheet, Image, Text, View, KeyboardAvoidingView, Dimensions } from 'react-native'

const loginBackgroundImage = require('../../../../resources/images/login-bg.png')
const logoImage = require('../../../../resources/images/logo-white.png')
const window = Dimensions.get('window')

/**
 * Loading component, used to display a splash screen when app is being started
 *
 */
export default class Loading extends Component {
    render() {
        return (
            <View style={s.container}>
                <Image source={loginBackgroundImage} style={s.backgroundImage}
                />
                <View style={s.logoContainer}>
                    <Image style={s.logo} source={logoImage} />
                </View>
            </View>
        )
    }
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    logoContainer: {
        flexGrow: 1,
        paddingTop: (window.height / 2) - 50,
        paddingLeft: (window.width / 2) - 50
    },
    logo: {
        width: 100,
        height: 100
    },
    backgroundImage: {
        position: 'absolute',
        width: window.width,
        height: window.height,
        resizeMode: 'cover'
    }
})
