import React, { Component } from 'react'
import { Text, TouchableOpacity, View, Image, Dimensions, } from 'react-native';
import Modal from 'react-native-modal'
import styles from './styles'
import { connect } from 'react-redux'
import { toggleSignupCompleteModal } from '../../actions'
const window = Dimensions.get('window')
const s = styles(window)
const closeIcon = require('../../../resources/images/close.png')

class SignupCompleteModal extends Component {
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
        isVisible={this.props.showSignupCompleteModal}
        animationOut={'slideOutLeft'}
        animationInTiming={300} >
        <View style={s.modalContent}>
          {this.renderCloseButton(() => {
            this.props.toggleSignupCompleteModal(false)
          })}
          <Text style={s.modalContentTitle}>Thanks for signing up!</Text>
          <Text style={s.modalContentDescription}>Check your email for a confirmation link.</Text>
        </View>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    showSignupCompleteModal: state.auth.showSignupCompleteModal,
  }
}

export default connect(mapStateToProps, { toggleSignupCompleteModal })(SignupCompleteModal)
