import { StyleSheet } from 'react-native'

export default styles = (window) => {
  return StyleSheet.create({
    dropdownInput: {
      height: 40,
      borderBottomWidth: 1,
      borderBottomColor: 'white',
      marginBottom: 10,
    },
    dropdownText: {
      fontSize: 17,
      color: "rgba(255, 255, 255, 1)",
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginTop: 10,
    },
    dropdownStyle: {
      width: (window.width - 40),
    },
    dropdownSelectionStyle: {
      fontSize: 17,
      color: '#999999',
    },
  })
}
