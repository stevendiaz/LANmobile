import { StyleSheet } from 'react-native'
import { colors } from '../../constants'

export default styles = (window) => {
  return StyleSheet.create({
    keyboardContainer: {
      flex: 1,
      height: window.height
    },
    container: {
      padding: 20,
      paddingBottom: 250,
      height: window.height,
      backgroundColor: colors.primary,
    },
    signUpText: {
      color: 'white',
    },
    signUpView: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    lanCrest: {
      flex: 1,
      height: undefined,
      width: undefined,
    },
    logoContainer: {
      flexGrow: 1,
      flex: 1,
      paddingTop: 50,
      paddingLeft: 25,
      paddingBottom: 25,
    },
    logoImage: {
      width: 60,
      height: 60
    },
    logoLetter: {
      width: 200,
      height: 50,
      resizeMode: 'contain'
    },
    logoTitle: {
      paddingTop: 50,
      fontSize: 25,
      color: 'white'
    },
    loginInputText: {
      height: 40,
      fontSize: 17,
      borderBottomWidth: 1,
      borderBottomColor: 'white',
      marginBottom: 10,
      color: 'white'
    },
    hidePasswordButton: {
      height: 40,
      borderBottomWidth: 1,
      borderBottomColor: 'white',
      marginBottom: 10,
    },
    passwordButton: {
      marginTop: 10,
      width: 28,
      height: 21,
      resizeMode: 'contain',
    },
    loginInputLabel: {
      color: 'rgba(255,255,255,0.7)'
    },
    loadingLabel: {
      color: 'white',
      textAlign: 'center'
    },
    loginBtnContainer: {
      marginTop: 40,
      backgroundColor: '#2196f3',
      borderRadius: 50,
      height: 50,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      elevation: 4
    },
    loginBtnText: {
      textAlign: 'center',
      paddingTop: 12,
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: 'rgba(0,0,0,0)'
    },
    errorMessageText: {
      marginTop: 15,
      textAlign: 'center',
      fontSize: 15,
      color: 'white'
    },
    errorMessageContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      marginLeft: 20
    },
    errorMessageImg: {
      marginTop: 14,
      marginRight: 10,
      width: 20,
      height: 20
    },
    backgroundImage: {
      position: 'absolute',
      width: window.width,
      height: window.height,
      resizeMode: 'cover',
      backgroundColor: '#2196f3',
    }
  })
}
