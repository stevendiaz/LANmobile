import React, { Component } from 'react'
import { Container, Header, Left, Body, Right, Button, Title, View } from 'native-base'
import { Platform, AsyncStorage, StyleSheet, ListView, Text, TouchableOpacity, Dimensions, Image, Linking } from 'react-native'
import Modal from 'react-native-modal'
import * as constants from '../../constants'
import { ACCOUNT_SETTINGS_MSG, LOGOUT_MSG, MESSAGES_MSG, TERMS_AND_CONDITIONS_MSG, NOTIFICATIONS_MSG } from './constants'
import * as cfg from '../../../config'
import { isServiceErrorResponse, renewToken, getServerHeaders, LOG } from '../../../utils'
import Onboarding from '../../OnboardingModal'
import styles from './styles'
const window = Dimensions.get('window')
const s = styles(window)
const closeIcon = require('../../../../resources/images/close.png')
const settingsIcon = require('../../../../resources/images/settings.png')
const helpIcon = require('../../../../resources/images/help.png')
const messagesIcon = require('../../../../resources/images/messages.png')
const messagesUnreadIcon = require('../../../../resources/images/messages-unread.png')
const notificationsIcon = require('../../../../resources/images/notifications.png')

var userId

/**
 * Screen Header component. Used as navigation header for the different sections
 * of the app.
 * @author Juan Carlos Cancela <juan@schoolinks.com>
 */
export default class ScreenHeader extends Component {
    constructor(props) {
        super(props)

        this.state = {
            visibleSettingsModal: false,
            visibleOnboarding: false,
            conversations: []
        }

        this.fetchConversations = this.fetchConversations.bind(this)
    }

    /**
     * Function to render the close button on the secondary header
     */
    renderCloseButton = (onPress) => (
        <TouchableOpacity onPress={onPress}>
            <Image source={closeIcon} style={s.settingsCloseBtn} />
        </TouchableOpacity>
    );

    /**
     * This function executes the logout operation, which removes the
     * authentication key, email and password from the app storage.
     * After that, it redirects the application to the login page.
     * 
     * @param {*} navigate object with the app navigation state
     */
    logout(navigate) {
        AsyncStorage.removeItem(constants.EMAIL_KEY)
        AsyncStorage.removeItem(constants.PASSWORD_KEY)
        AsyncStorage.removeItem(constants.USER_JWT_TOKEN)
        AsyncStorage.removeItem(constants.USER_JWT_REFRESH_TOKEN)
        AsyncStorage.removeItem(constants.USER_ID)
        AsyncStorage.removeItem(constants.USER_TOKEN)
        AsyncStorage.removeItem(constants.NOTIFICATIONS_USER_ID)
        AsyncStorage.removeItem(constants.ONBOARDING_VISIBLE)
        this.setState({ visibleSettingsModal: false })
        navigate('Login')
    }

    /**
    * Function to fetch user conversations
    * @param {*} jwtToken User's JWT token
    */
    async fetchConversations(jwtToken) {
        let getConversationsUrl = `${cfg.MESSAGES_URL}/conversations?include_last_message=true&include_participants_profiles=false`
        fetch(getConversationsUrl, {
            method: 'GET',
            headers: getServerHeaders(jwtToken)
        })
            .then((conversationsResponse) => conversationsResponse.json())
            .then((conversationsReponse) => {
                if (isServiceErrorResponse(conversationsReponse)) {
                    console.log(`fetchConversations2`)
                    renewToken(this.fetchConversations)
                } else {
                    //FlatList requires a key property on each item
                    conversationsReponse.forEach((conversation, idx) => {
                        conversationsReponse[idx]['key'] = conversation.id
                        conversationsReponse[idx]['userId'] = userId
                    })
                    this.setState({ conversations: conversationsReponse })
                }
            })
            .catch((error) => {
                LOG(`MessageCenterMain/index.js::error => ${JSON.stringify(error)}`)
            })
    }

    /**
    * This function fetches JWT token
    */
    async fetchJwtToken() {
        try {
            let jwtToken = await AsyncStorage.getItem(constants.USER_JWT_TOKEN)
            return jwtToken
        } catch (error) {
            LOG(`ERROR`)
        }
    }

    /**
    * Actions to be executed once the component is mounted
    */
    async componentDidMount() {
        let data
        let jwtToken

        /**
         * Again, this crazy bug... need to use multiget since when user is logged in
         * initially, it sets the last AsyncStorage call to null
         */
        data = await AsyncStorage.multiGet([constants.USER_JWT_TOKEN, constants.USER_ID])
        jwtToken = data[0][1]
        userId = data[1][1]

        this.fetchConversations(jwtToken)
        this.refreshConversations = setInterval(() => {
            this.fetchConversations(jwtToken)
        }, cfg.TIME_IN_MILLIS_REFRESH_MESSAGES)
    }

    /**
    * Actions to be executed once the component is unmounted
    */
    componentWillUnmount() {
        clearInterval(this.refreshConversations);
    }

    /**
     * This function renders the settings modal, which is accessible from
     * the secondary header.
     * 
     * @param {*} navigate object with the app navigation state
     */
    renderSettingsModal(navigate) {
        return (
            <Modal isVisible={this.state.visibleSettingsModal}>
                <View style={s.settingsModalContainer}>
                    {this.renderCloseButton(() => this.setState({ visibleSettingsModal: false }))}
                    <Text style={s.settingsModalAccountSettingsText}>{ACCOUNT_SETTINGS_MSG}</Text>
                    <Button style={s.settingsModalTermsAndCondsBtn} onPress={() => { Linking.openURL(constants.TERMS_AND_CONDITIONS_URL) }}>
                        <Text style={s.settingsModalTermsAndCondsText}>{TERMS_AND_CONDITIONS_MSG}</Text>
                    </Button>
                    <Text />
                    <Text />
                    <Button onPress={() => { this.logout(navigate) }}
                        style={s.settingsModalLogOutBtn}>
                        <Text style={s.settingsModalLogOutText} >{LOGOUT_MSG}</Text>
                    </Button>
                </View >
            </Modal>
        )
    }

    /**
     * Function that renders the main header, which contains the buttons to
     * navigate through the different sections of the application.
     * 
     * @param {*} navigate object with the app navigation state
     * @param {*} conversations list of conversations
     * @param {*} userId id of the user logged in the app
     * @param {*} screenType the name of the type of screen ('messages' or 'notifications')
     */
    renderMainHeader(navigate, conversations, userId, screenType) {
        let msgIcon
        if (this.areMessagesUnread(conversations, userId)) {
            msgIcon = messagesUnreadIcon
        } else {
            msgIcon = messagesIcon
        }
        switch (screenType) {
            case 'messages':
                return (
                    <Header style={s.mainHeaderContainer}>
                        <Left style={{ flex: 1 }}>
                            <TouchableOpacity>
                                <Image source={msgIcon} style={s.mainHeaderIcon} />
                                <View style={s.leftUnderlineSelector}>
                                    <Text style={s.underlineSelectorContent}></Text>
                                </View>
                            </TouchableOpacity>
                        </Left>
                        <Body style={{ flex: 1 }}>
                            <Title style={s.headerTitle}>{MESSAGES_MSG}</Title>
                        </Body>
                        <Right style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => navigate('NotificationsMain')}>
                                <Image source={notificationsIcon} style={s.mainHeaderIcon} />
                            </TouchableOpacity>
                        </Right>
                    </Header>
                )
            case 'notifications':
                return (
                    <Header style={s.mainHeaderContainer}>
                        <Left style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => navigate('MessageCenterMain', { navigate })}>
                                <Image source={msgIcon} style={s.mainHeaderIcon} />
                            </TouchableOpacity>
                        </Left>
                        <Body style={{ flex: 1 }}>
                            <Title style={s.headerTitle}>{NOTIFICATIONS_MSG}</Title>
                        </Body>
                        <Right style={{ flex: 1 }}>
                            <TouchableOpacity>
                                <Image source={notificationsIcon}
                                    style={s.mainHeaderIcon} />
                                <View style={s.rightUnderlineSelector}>
                                    <Text style={s.underlineSelectorContent}></Text>
                                </View>
                            </TouchableOpacity>
                        </Right>
                    </Header>
                )
        }
    }

    /**
     * Renders the secondary header, which contains contextual operations to the
     * message center section of the application.
     * 
     * @param {*} navigate object with the app navigation state
     */
    renderSecondaryHeader(navigate) {
        return (
            <View style={s.secondaryHeaderContainer}>
                <TouchableOpacity onPress={() => {
                    this.setState({ visibleOnboarding: true })

                    //This is a hacky trick to handle visibility of onboarding modal. 
                    //Basically it mimics a toggle feature, waiting 1000 milis after next
                    //render, so when onboarding modal is closed (and with state true), it
                    //will reset value to false, so when user taps on help button again,
                    //initial state (false) is already on place.
                    // setTimeout(() => {
                    //     this.state.visibleOnboarding = false
                    // }, 10000)
                    // this.forceUpdate()
                }}>
                    <Image source={helpIcon} style={s.secondaryHeaderIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ visibleSettingsModal: true })}>
                    <Image source={settingsIcon} style={s.secondaryHeaderIcon} />
                </TouchableOpacity>
            </View>
        )
    }

    closeOnboardingModal() {
        this.state.visibleOnboarding = false
        this.forceUpdate()
    }

    /**
     * Given a list of conversations and the id of the user logged in the app,
     * determines whether or not there are unread messages by the on any 
     * user in any of the given conversations
     * @param {*} conversations list of conversations
     * @param {*} userId the id of the user logged in the app
     * 
     * @return {*} TRUE if there is at least one unread message, otherwise FALSE
     */
    areMessagesUnread(conversations, userId) {
        let anyUnreadMessageOnConversations = false
        if (!conversations || conversations.length == 0 || !userId) return false
        conversations.forEach((conversation) => {
            let anyUnreadMessageOnConversation = true
            if (!conversation.last_message || !conversation.last_message.read_by) return
            conversation.last_message.read_by.forEach((userIdThatReadConversation) => {
                if (userIdThatReadConversation == userId) anyUnreadMessageOnConversation = false
            })
            if (anyUnreadMessageOnConversation) anyUnreadMessageOnConversations = true
        })

        return anyUnreadMessageOnConversations
    }

    renderOnboarding(visibleOnboarding) {
        if (visibleOnboarding) {
            return (
                <View>
                    <Onboarding handler={() => this.closeOnboardingModal()} />
                </View>
            )
        } else {
            return (
                <View />
            )
        }
    }

    render() {
        const { navigate } = this.props.navigation
        const { screenType } = this.props
        const { conversations, visibleOnboarding } = this.state
        return (
            <View>
                {this.renderOnboarding(visibleOnboarding)}
                {this.renderMainHeader(navigate, conversations, userId, screenType)}
                {this.renderSecondaryHeader(navigate)}
                {this.renderSettingsModal(navigate)}
            </View>
        )
    }
}