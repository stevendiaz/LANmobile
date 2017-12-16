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
    inputText: {
      height: 40,
      fontSize: 17,
      borderBottomWidth: 1,
      borderBottomColor: 'white',
      marginBottom: 10,
      color: 'white'
    },
    inputLabel: {
      color: 'rgba(255,255,255,0.7)'
    },
  })
}
