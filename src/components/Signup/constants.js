export const labels = {
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

export const MAX_GRADUATION_DATE = '2026-05-15'
export const MIN_GRADUATION_DATE = '2016-05-15'
export const MIN_PASSWORD_LENGTH = 6
export const USERNAME_ERROR_MESSAGE = 'A user with that username already exists.'
