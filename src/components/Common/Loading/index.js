import React, { Component } from 'react'
import { StyleSheet, Image, Text, View, KeyboardAvoidingView, Dimensions } from 'react-native'

const logoImage = require('../../../../resources/images/lan-crest-white.png')
const window = Dimensions.get('window')

/**
 * Loading component, used to display a splash screen when app is being started
 *
 */
export default class Loading extends Component {
    render() {
        return (
            <View style={s.container}>
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
        backgroundColor: '#145991',
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
        resizeMode: 'cover',
        backgroundColor: '#2196f3',
    }
})
