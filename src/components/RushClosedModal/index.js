import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Image, Dimensions, } from 'react-native';
import Modal from 'react-native-modal'
import styles from './styles'
import { connect } from 'react-redux'
import { toggleRushModal } from '../../actions'
const window = Dimensions.get('window')
const s = styles(window)
const closeIcon = require('../../../resources/images/close.png')

class RushClosedModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isVisible: true,
    }
  }

  renderCloseButton = (onPress) => (
    <TouchableOpacity onPress={onPress}>
      <Image source={closeIcon} style={s.closeButton} onPress={onPress} />
    </TouchableOpacity>
  )

  render() {
    return (
      <Modal
        isVisible={this.props.showRushModal}
        animationOut={'slideOutLeft'}
        animationInTiming={300} >
        <View style={s.modalContent}>
          {this.renderCloseButton(() => {
            this.props.toggleRushModal(false)
            if (this.props.handler) this.props.handler()
          })}
          <Text style={s.modalContentTitle}>Sorry!</Text>
          <Text style={s.modalContentDescription}>Looks like rush isnt open yet. Check back soon for updates.</Text>
        </View>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    showRushModal: state.auth.showRushModal,
  }
}

export default connect(mapStateToProps, { toggleRushModal })(RushClosedModal)
