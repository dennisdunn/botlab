// button reducer
import * as Actions from '../actions/actions'
import { combineReducers } from 'redux'

const INITIAL_BUTTON_STATE = {
  blue: false,
  green: false,
  yellow: false,
  red: false
}

export default (state = INITIAL_BUTTON_STATE, action) => {
  let update = {}
  switch (action.type) {
    case Actions.TOGGLE_BUTTON:
      update[action.key] = !state[action.key]
      return Object.assign({}, state, update)
    case Actions.BUTTON_ON:
      update[action.key] = true
      return Object.assign({}, state, update)
    case Actions.BUTTON_OFF:
      update[action.key] = false
      return Object.assign({}, state, update)
    default:
      return state
  }
}

