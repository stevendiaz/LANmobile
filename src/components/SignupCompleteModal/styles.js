import { StyleSheet, Platform } from 'react-native'

export default styles = (window) => {
  return StyleSheet.create({
    closeButton: {
      marginLeft: window.width - 80,
      marginTop: 0
    },
    modalContent: {
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 22,
      height: window.height / 6,
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    modalContentTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      justifyContent: 'center',
      textAlign: 'center',
    },
    modalContentDescription: {
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: 20
    },
  })
}
