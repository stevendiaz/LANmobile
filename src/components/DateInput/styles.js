import { StyleSheet } from 'react-native'

export default styles = (window) => {
  return StyleSheet.create({
    dateBox: {
      borderWidth: 0,
      alignItems: 'flex-start',
    },
    dateText: {
      fontSize: 17,
      color: "rgba(255, 255, 255, 1)",
    },
    inputDate: {
      height: 40,
			width: undefined,
      borderBottomWidth: 1,
      borderBottomColor: 'white',
      marginBottom: 10,
    },
  })
}
