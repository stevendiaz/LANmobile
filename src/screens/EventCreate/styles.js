import { StyleSheet } from 'react-native'

export default styles = (window) => {
  return StyleSheet.create({
    container: {
      padding: 20,
      paddingBottom: 20,
      height: window.height,
    },
    inputText: {
      height: 40,
      fontSize: 17,
      borderBottomWidth: 1,
      borderBottomColor: '#444444',
      marginBottom: 10,
      color: 'white'
    },
    createEventContainer: {
      marginTop: 40,
      backgroundColor: '#2196f3',
      borderRadius: 50,
      height: 50,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      elevation: 4
    },
    createEventText: {
      textAlign: 'center',
      paddingTop: 12,
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: 'rgba(0,0,0,0)'
    },
  })
}
