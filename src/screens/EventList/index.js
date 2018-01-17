import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, Dimensions } from 'react-native'
import EventItem from '../../components/EventItem'
import { fetchEvents } from '../../actions'
import styles from './styles'
const window = Dimensions.get('window')
const s = styles(window)

class EventList extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchEvents(this.props.jwtToken)
  }

  render() {
    return (
      <View style={{height: '100%'}}>
        <FlatList
          style={s.eventListContainer}
          data={this.props.eventList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <EventItem
            location={item.location}
            title={item.title}
            date={item.start_time} />}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    eventList: state.eventsList.eventList,
    jwtToken: state.auth.jwtToken,
  }
}

export default connect(mapStateToProps, { fetchEvents })(EventList)
