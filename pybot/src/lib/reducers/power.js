// power reducer
import Actions from '../actions/actions'

const INITIAL_STATE = {
  power: 0,
  direction: Actions.FORWARD
}

export default (state = INITIAL_STATE, action) => {
  let update = { power: action.value || 0 }
  switch (action.type) {
    case Actions.FORWARD:
    case Actions.BACKWARD:
      update.direction = action.type
      return Object.assign({}, state, update)
    case Actions.STOP:
      update.power = 0
      return Object.assign({}, state, update)
    default:
      return state
  }
}