import { Platform, StyleSheet } from 'react-native'

export default styles = (window) => {
    return StyleSheet.create({
        mainHeaderIcon: {
            marginTop: 7,
            resizeMode: 'contain',
            maxWidth: 20
        },
        secondaryHeaderIcon: {
            marginRight: 25,
            resizeMode: 'contain',
            width: 20
        },
        mainHeaderContainer: {
            backgroundColor: '#6A9B16'
        },
        secondaryHeaderContainer: {
            marginTop: 5,
            marginLeft: window.width - 80,
            flexDirection: 'row',
            backgroundColor: '#F6F6F6',
            borderBottomColor: '#F6F6F6'
        },
        headerTitle: {
            width: (Platform.OS === 'ios') ? 150 : null,
            color: 'white',
            marginTop: 5
        },
        settingsModalContainer: {
            backgroundColor: 'white',
            padding: 22,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            borderColor: 'rgba(0, 0, 0, 0.1)'
        },
        settingsCloseBtn: {
            marginLeft: window.width - 80
        },
        settingsModalTermsAndCondsBtn: {
            width: '100%',
            borderRadius: 50,
            backgroundColor: 'white',
            borderWidth: 2,
            elevation: 0,
            borderColor: '#60A9D1',
            justifyContent: 'center'
        },
        settingsModalTermsAndCondsText: {
            textAlign: 'center',
            color: '#60A9D1',
            fontSize: 18
        },
        settingsModalAccountSettingsText: {
            fontSize: 22,
            paddingBottom: 22
        },
        settingsModalLogOutBtn: {
            width: '100%',
            borderRadius: 50,
            elevation: 0,
            backgroundColor: '#EC6D6E',
            justifyContent: 'center'
        },
        settingsModalLogOutText: {
            textAlign: 'center',
            fontSize: 18,
            color: 'white'
        },
        rightUnderlineSelector: {
            position: 'absolute',
            backgroundColor: '#F6F6F6',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'transparent',
            top: (Platform.OS === 'ios') ? 40 : 35,
            left: -20,
            width: 58,
        },
        leftUnderlineSelector: {
            position: 'absolute',
            backgroundColor: '#F6F6F6',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'transparent',
            top: (Platform.OS === 'ios') ? 37 : 35,
            left: -20,
            width: 58,
        },
        underlineSelectorContent: {
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'transparent',
            backgroundColor: 'transparent'
        }
    })
}