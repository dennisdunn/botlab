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
  let newState = Object.assign({}, state)
  switch (action.type) {
    case Actions.TOGGLE_SWITCH:
      newState[action.payload] = !newState[action.payload]
      break;
    default:
      newState = state;
  }
  return newState
}

const INITIAL_POWER_STATE = {
  min: 100,
  max: 250,
  current: 0,
  turn: 0
}

function powerReducer(state = INITIAL_POWER_STATE, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case Actions.SET_POWER:
      newState.current = action.payload
      break;
    case Actions.SET_POWER_OFF:
      newState.current = 0
      break;
    case Actions.SET_TURN_OFF:
      newState.turn = 0
      break;
    case Actions.SET_TURN:
      newState.turn = action.payload
      break;
    default:
      newState = state;
  }
  return newState
}

const botApp = combineReducers({ loggingReducer, switchReducer, powerReducer })
export default botApp