import { EVENT_FIELD_SET } from './types'

export const setEventFormValue = ({key, value}) => {
  return {
    type: EVENT_FIELD_SET,
    payload: {
      key: key,
      value: value,
    }
  }
}
