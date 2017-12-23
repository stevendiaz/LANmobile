import { StyleSheet } from 'react-native'

export default styles = (window) => {
  return StyleSheet.create({
    keyboardContainer: {
      flex: 1,
      height: window.height,
    },
    container: {
      padding: 20,
      paddingBottom: 20,
      height: window.height,
      backgroundColor: '#145991',
    },
    dateText: {
      fontSize: 17,
      color: "rgba(255, 255, 255, 1)",
    },
    inputText: {
      height: 40,
      fontSize: 17,
      borderBottomWidth: 1,
      borderBottomColor: 'white',
      marginBottom: 10,
      color: 'white'
    },
    inputTextFirst: {
      flex: 1,
      height: 40,
      fontSize: 17,
      borderBottomWidth: 1,
      borderBottomColor: 'white',
      marginBottom: 10,
      marginRight: 10,
      color: 'white'
    },
    inputTextLast: {
      flex: 1,
      height: 40,
      fontSize: 17,
      borderBottomWidth: 1,
      borderBottomColor: 'white',
      marginBottom: 10,
      marginLeft: 10,
      color: 'white'
    },
    dropdownStyle: {
      width: (window.width - 40),
    },
    dropdownSelectionStyle: {
      fontSize: 17,
      color: '#999999',
    },
    dropdownText: {
      fontSize: 17,
      color: "rgba(255, 255, 255, 1)",
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginTop: 10,
    },
    dropdownInput: {
      height: 40,
      borderBottomWidth: 1,
      borderBottomColor: 'white',
      marginBottom: 10,
    },
    dateBox: {
      borderWidth: 0,
      alignItems: 'flex-start',
    },
    inputDate: {
      height: 40,
			width: undefined,
      borderBottomWidth: 1,
      borderBottomColor: 'white',
      marginBottom: 10,
    },
    inputLabel: {
      color: 'rgba(255,255,255,0.7)'
    },
    logoContainer: {
      flexGrow: 1,
      flex: 1,
      paddingTop: 50,
      paddingLeft: 25,
      paddingBottom: 25,
    },
    lanCrest: {
      flex: 1,
      height: undefined,
      width: undefined,
    },
    signupBtnContainer: {
      marginTop: 40,
      backgroundColor: '#2196f3',
      borderRadius: 50,
      height: 50,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      elevation: 4
    },
    signupBtnText: {
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
      flexDirection: 'row',
      height: 20,
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
  })
}
