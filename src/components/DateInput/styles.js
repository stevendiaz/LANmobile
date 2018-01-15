import { StyleSheet } from 'react-native'

export default styles = (window) => {
  return StyleSheet.create({
    dateBox: {
      borderWidth: 0,
      alignItems: 'flex-start',
    },
    dateTextLight: {
      fontSize: 17,
      color: "rgba(255, 255, 255, 1)",
    },
    dateTextDark: {
      fontSize: 17,
      color: "#444444",
    },
    inputDateLight: {
      height: 40,
			width: undefined,
      borderBottomWidth: 1,
      borderBottomColor: 'white',
      marginBottom: 10,
    },
    inputDateDark: {
      height: 40,
			width: undefined,
      borderBottomWidth: 1,
      borderBottomColor: '#444444',
      marginBottom: 10,
    },
  })
}
