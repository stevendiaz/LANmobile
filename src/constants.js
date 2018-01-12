/**
 * List of global app constants, such as storage keys and URLs
 */

export const LOGIN_STATUS_PENDING = 'pending'
export const LOGIN_STATUS_NOT_LOGGED = 'notLogged'
export const LOGIN_STATUS_LOGGED = 'logged'
export const ONBOARDING_VISIBLE = 'onboarding'
export const EMAIL_KEY = 'email'
export const PASSWORD_KEY = 'password'
export const USER_JWT_TOKEN = 'user_jwt_token'
export const USER_JWT_REFRESH_TOKEN = 'user_jwt_refresh_token'
export const USER_ID = 'user_id'
export const USER_TOKEN = 'user_token'
export const NOTIFICATIONS_USER_ID = 'notifications_user_id'
export const MAX_GRADUATION_DATE = '2026-05-15'
export const MIN_GRADUATION_DATE = '2016-05-15'
export const MIN_PASSWORD_LENGTH = 6
export const USERNAME_ERROR_MESSAGE = 'A user with that username already exists.'
export const EMAIL_NOT_VERIFIED = 'Email not verified yet. Check your email.'
export const colors = {
  primary: '#145991'
}
export const inputProps = {
  email: {
    display: 'Email',
    key: 'email',
  },
  firstname: {
    display: 'First name',
    key: 'firstname',
  },
  lastname: {
    display: 'Last name',
    key: 'lastname',
  },
  password: {
    display: 'Password',
    key: 'password',
  },
  confirmPassword: {
    display: 'Confirm password',
    key: 'confirmPassword',
  },
  graduationDate: {
    display: 'Graduation date',
    key: 'graduationDate',
  },
  concentration: {
    display: 'Concentration',
    key: 'concentration',
    dropdownOptions: {
      'Computer Science': 'CS',
      'Design': 'D',
      'Business': 'B',
      'Electrical Engineering': 'EE',
      'Math': 'M',
      'Management Information Systems': 'MIS',
      'Other': 'O',
    },
  },
}
