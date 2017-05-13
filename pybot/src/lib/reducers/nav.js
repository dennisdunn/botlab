// navigation reducer
import Actions from '../actions/actions'

const INITIAL_STATE = {
    turn: Actions.TURN_STRAIGHT,
    timeout: 0
}

export default (state = INITIAL_STATE, action) => {
    let update = {
        turn: action.type,
        timeout: action.payload || 0
    }
    switch (action.type) {
        case Actions.TURN_LEFT:
        case Actions.TURN_RIGHT:
        case Actions.TURN_STRAIGHT:
            return Object.assign({}, state, update)
        default:
            return state
    }
}