import { Platform, StyleSheet } from 'react-native'

export default styles = (window) => {
	return StyleSheet.create({
		eventListContainer: {
			backgroundColor: '#F6F6F6',
			height: window.height,
			shadowColor: 'rgba(255,255,255,0.7)',
			shadowOffset: {width: 5, height: 5},
			shadowOpacity: 1,
			shadowRadius: 15
		},
	})
}
