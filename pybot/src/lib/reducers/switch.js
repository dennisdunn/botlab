// switch reducer
import * as Actions from './actions'
import { combineReducers } from 'redux'

const INITIAL_SWITCH_STATE = {
  blue: false,
  green: false,
  yellow: false,
  red: false
}

export default (state = INITIAL_SWITCH_STATE, action) => {
  let update = {}
  switch (action.type) {
    case Actions.TOGGLE_SWITCH:
      update[action.key] = !state[action.key]
      return Object.assign({}, state, update)
    case Actions.SWITCH_ON:
      update[action.key] = true
      return Object.assign({}, state, update)
    case Actions.SWITCH_OFF:
      update[action.key] = false
      return Object.assign({}, state, update)
    default:
      return state
  }
}

