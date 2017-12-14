import React, { Component } from 'react'
import { View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

/**
 * Loading component, used to display a splash screen when app is being started
 *
 */
export default class LoadingScreen extends Component {
    render() {
        let { text } = this.props
        return (
            <View style={{ flex: 1 }}>
                <Spinner visible={true}
                    textContent={text}
                    textStyle={{ color: '#FFF' }}
                    overlayColor="#6B9A25" />
            </View>
        )
    }
}
