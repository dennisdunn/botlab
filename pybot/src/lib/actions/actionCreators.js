/**
 * 
 */
import Actions from './actions'
import Client from '../restClient'

let factory = {}
const uri = 'http://192.168.0.13:8080/api/v1/nav/'

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
                    type: Action.SET_THROTTLE,
                    payload: { speed: data }
                })
            })
    }
}

factory[Actions.TURN_LEFT] = (timeout) => {
    return (dispatch) => {
        Client.send(uri + 'steering/left', timeout)
            .then(data => {
                dispatch({
                    type: Action.TURN_LEFT,
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
                    type: Action.TURN_STRAIGHT,
                    payload:data
                })
            })
    }
}

factory[Actions.TURN_RIGHT] = (timeout) => {
    return (dispatch) => {
        Client.send(uri + 'steering/right', timeout)
            .then(data => {
                dispatch({
                    type: Action.TURN_RIGHT,
                    payload: data
                })
            })
    }
}

export default factory
