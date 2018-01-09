import { StyleSheet } from 'react-native'
import { colors } from '../../constants'

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f6f6f6',
      paddingTop: 40,
      paddingHorizontal: 20
    },
    drawerItem: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.primary,
      padding: 15,
      margin: 5,
      textAlign: 'left'
    },
    logoutItem: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'darkgrey',
      padding: 15,
      margin: 5,
      textAlign: 'left'
    },
  })
