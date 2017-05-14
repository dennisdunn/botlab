/**
 * 
 */
import Actions from './actions'
import Client from '../restClient'

let factory = {}
const uri = 'http://192.168.0.13:5000/api/v1/'

// The default action creator simply dispatches the action with the arguments.
Object.keys(Actions).forEach(actionType => {
    factory[actionType] = (args) => {
        return (dispatch, getstate) => {
            let action = {
                type: actionType,
                payload: args
            }
            dispatch(action)
        }
    }
})

factory[Actions.SET_THROTTLE] = (speed) => {
    return (dispatch) => {
        Client.send(uri + 'throttle', speed)
            .then(data => {
                dispatch({
                    type: Actions.SET_THROTTLE,
                    payload: data
                })
            })
    }
}

factory[Actions.TURN_LEFT] = (timeout) => {
    return (dispatch) => {
        Client.send(uri + 'steering/left', timeout)
            .then(data => {
                dispatch({
                    type: Actions.TURN_LEFT,
                    payload: data
                })
            })
    }
}

factory[Actions.TURN_STRAIGHT] = () => {
    return (dispatch) => {
        Client.send(uri + 'steering/straight')
            .then(data => {
                dispatch({
                    type: Actions.TURN_STRAIGHT,
                    payload: data
                })
            })
    }
}

factory[Actions.TURN_RIGHT] = (timeout) => {
    return (dispatch) => {
        Client.send(uri + 'steering/right', timeout)
            .then(data => {
                dispatch({
                    type: Actions.TURN_RIGHT,
                    payload: data
                })
            })
    }
}

factory[Actions.TOGGLE_DIRECTION] = (key) => {
    return (dispatch, getstate) => {
        let currentState = getstate().Button[key]
        let direction = (currentState) ? 'forward' : 'reverse'
        Client.send(uri + 'motor/' + direction)
            .then(data => {
                dispatch({
                    type: Actions.SET_DIRECTION,
                    payload: direction
                })
                dispatch({
                    type: Actions.TOGGLE_SWITCH,
                    payload: key
                })
            })
    }
}

export default factory
