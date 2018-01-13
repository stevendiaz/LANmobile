/**
 * Utility functions used throught the application
 */

import * as cfg from './config'
import * as c from './constants'
import { AsyncStorage } from 'react-native'
import moment from 'moment';

/**
 * @param date string date with format MM/DD/YY HH:MM:SS
 * @return formatted HH:MM string date
 */
export function getFormattedHHMM(date) {
    let d = new moment(date)
    return d.format('LT')
}

/**
 * @param date string date with format MM/DD/YY HH:MM:SS
 * @return formatted MM/DD/YYYY string date
 */
export function getFormattedMMDDYYYY(date) {
    let d = new moment(date)
    return d.format('L')
}

export function getFormattedMMDD(date) {
  let d = new moment(date)
  return d.format('M[/]D')
}

/**
 * @param date string date with format MM/DD/YY HH:MM:SS
 * @return TRUE if provided date is today, otherwise FALSE
 */
export function isToday(date) {
    let now = new Date()
    return now.toDateString() === date.toDateString()
}

/**
 * Evaluates whether or not the service response is not valid, expired or empty
 * @param {*} rsp Service response to be evaluated
 * @return TRUE if its an error service response, otherwise FALSE
 */
export function isServiceErrorResponse(rsp) {
    if (!rsp) return false
    return rsp && rsp.code && (rsp.code === 'token_invalid_signature' || rsp.code === 'token_expired')
}

/**
 * Logs messages of applications events.
 * Logs will only be displayed if its on development mode.
 * @param {*} message message to be logged
 */
export function LOG(message) {
    if (false) {
        let now = new Date()
        console.log(`${now}::${message}`)
    }
}

/**
 * Returns an object with the appropriate headers, depending whether or not
 * is in a development environment
 * !!These headers are the ones required by the legacy service stack (the 
 * one used by login and notifications, in example)
 * 
 * @return request headers
 */
export function getLegacyServerHeaders() {
    if (cfg.IS_DEV) {
        return {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Authorization': 'Basic ' + cfg.NOTIFICATIONS_SERVER_PASSWORD
        }
    } else {
        return {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    }
}

/**
 * Returns the headers for the login service
 */
function getLoginServerHeaders() {
    if (cfg.IS_DEV) {
        return {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Authorization': 'Basic ' + cfg.LOGIN_SERVER_PASSWORD
        }
    } else {
        return {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    }
}

/**
 * Returns an object with the appropriate headers
 * !!Note: these are the headers used in the new service stack (based on JWT)
 * @param {*} jwtToken the JWT token
 * @return request headers
 */
export function getServerHeaders(jwtToken) {
    return {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
    }
}

/**
 * Function is charge or regenerating a new pair of JWT and JWT refresh 
 * tokens
 * @param action the action that was executed when the token required regeneration
 * @param param (optional) param that needs to be supplied to be forwarded action
 * //TODO Improvement param would be a list of params to make it more flexible
 */
export async function renewToken(action, param = null) {
    let email = await AsyncStorage.getItem(c.EMAIL_KEY)
    let password = await AsyncStorage.getItem(c.PASSWORD_KEY)
    let loginUrl = `${cfg.LOGIN_URL}?access_token=${cfg.ACCESS_TOKEN}&User[login_email]=${email}&User[login_password]=${password}`
    fetch(loginUrl, {
        method: 'GET',
        headers: getLoginServerHeaders()
    })
        .then((authResponse) => authResponse.json())
        .then((authResponse) => {
            AsyncStorage.setItem(c.USER_JWT_REFRESH_TOKEN, authResponse.user.refresh_token)
            AsyncStorage.setItem(c.USER_JWT_TOKEN, authResponse.user.jwt_token)
            param ? action(authResponse.user.jwt_token, param) : action(authResponse.user.jwt_token)
        })
        .catch((error) => console.log(`renewToken error => ${JSON.stringify(error)}`))
}
