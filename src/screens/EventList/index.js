import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Dimensions } from 'react-native'
import EventItem from '../../components/EventItem'
import styles from './styles'
const window = Dimensions.get('window')
const s = styles(window)

class EventList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    notifications = [{key: 0, location: '1908 San Gabriel St',  title: 'Coffee Night', created: '01/08/2018 12:04:22'}, {key: 1, location: '1207 Barton Springs Rd', title: 'Peter Pan MiniGolf', created: '01/08/2018 12:04:22'}]
    return (
      <View style={{height: '100%'}}>
        <FlatList
          style={s.eventListContainer}
          data={notifications}
          renderItem={({ item }) => <EventItem
            location={item.location}
            title={item.title}
            date={item.created} />}
        />
      </View>
    )
  }
}

export default connect()(EventList)
