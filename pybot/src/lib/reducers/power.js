// power reducer
import Actions from '../actions/actions'

const INITIAL_STATE = {
  power: 0,
  direction: 'forward'
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.SET_DIRECTION:
      return Object.assign({}, state, { direction: action.payload })
    case Actions.SET_THROTTLE:
      return Object.assign({}, state, { power: action.payload })
    default:
      return state
  }
}