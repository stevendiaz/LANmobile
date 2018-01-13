import { StyleSheet } from 'react-native'

export default styles = (window) => {
  return StyleSheet.create({
    container: {
      borderRadius: 10,
      borderWidth: 1,
      margin: 15,
      marginBottom: 5,
      paddingBottom: 15,
      paddingTop: 15,
      marginTop: 5,
      backgroundColor: '#FFFFFF',
      borderColor: '#FFFFFF',
      shadowColor: '#D3D3D3',
      shadowOffset: { height: -1, width: 0 },
      elevation: 3,
      shadowOpacity: 0.8,
      shadowRadius: 2,
      flexDirection: 'row',
    },
    iconContainer: {
      flex: 1,
      flexDirection: 'row',
      marginRight: 8,
      marginLeft: 8,
      backgroundColor: '#FFFFFF'
    },
    date: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
      marginLeft: 8,
      backgroundColor: '#FFFFFF'
    },
    dateText: {
      fontSize: 22,
    },
    eventInfo: {
      backgroundColor: '#FFFFFF',
      flex: 4,
    },
    eventDetail: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    eventTitleText: {
      fontSize: 18,
    },
    eventLocationText: {
      fontSize: 12,
      color: '#999999',
    },
    icon: {
      marginTop: 5,
      height: 40,
      width: 40,
      borderRadius: 20,
    },
  })
}
