// button reducer
import Actions from '../actions/actions'

const INITIAL_BUTTON_STATE = {
  blue: false,
  green: false,
  yellow: false,
  red: false
}

export default (state = INITIAL_BUTTON_STATE, action) => {
  let update = {}
  switch (action.type) {
    case Actions.TOGGLE_SWITCH:
      update[action.payload] = !state[action.payload]
      return Object.assign({}, state, update)
    case Actions.SET_SWITCH:
      update[action.payload] = true
      return Object.assign({}, state, update)
    case Actions.CLEAR_SWITCH:
      update[action.payload] = false
      return Object.assign({}, state, update)
    default:
      return state
  }
}

