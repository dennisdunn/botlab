// navigation reducer
import * as Actions from '../actions/actions'

const INITIAL_STATE = {
    direction: Actions.FORWARD,
    turn: Actions.STRAIGHT,
    timeout: 0
}

export default (state = INITIAL_STATE, action) => {
    let update = { direction: action.type, timeout: 0 }
    switch (action.type) {
        case Actions.LEFT:
        case Actions.RIGHT:
            update.timeout = action.value
            return Object.assign({}, state, update)
        case Actions.STRAIGHT:
            return Object.assign({}, state, update)
        default:
            return state
    }
}