import * as Actions from './actions'
import { combineReducers } from 'redux'

function loggingReducer(state = {}, action) {
  console.log(action);
  return state
}

const INITIAL_SWITCH_STATE = {
  blue: false,
  green: false,
  yellow: false,
  red: false
}

function switchReducer(state = INITIAL_SWITCH_STATE, action) {
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

const INITIAL_POWER_STATE = {
  min: 100,
  max: 250,
  current: 0,
  turn: 0
}

function powerReducer(state = INITIAL_POWER_STATE, action) {
  let update = {}
  switch (action.type) {
    case Actions.SET_POWER:
      update.current = action.value
      return Object.assign({}, state, update)
    case Actions.SET_POWER_OFF:
      update.current = 0
      return Object.assign({}, state, update)
    case Actions.SET_TURN_OFF:
      update.turn = 0
      return Object.assign({}, state, update)
    case Actions.SET_TURN:
      update.turn = action.value
      return Object.assign({}, state, update)
    default:
      return state
  }
}

const rootReducer = combineReducers({ loggingReducer, switchReducer, powerReducer })
export default rootReducer