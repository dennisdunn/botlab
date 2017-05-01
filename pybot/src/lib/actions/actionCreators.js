import * as Actions from './actions'
require('es6-promise').polyfill()
require('isomorphic-fetch')
/**
 * 
 */
let factory = {}
const navUrl = 'http://192.168.0.13:8080/api/v1/nav/'
const motorUrl = 'http://192.168.0.13:8080/api/v1/motor/'

// factory[Actions.SWITCH_ON] = (eventArgs) => {
//     return {
//         type: Actions.SWITCH_ON,
//         target: 'led',
//         key: eventArgs.payload
//     }
// }

// factory[Actions.SWITCH_OFF] = (eventArgs) => {
//     return {
//         type: Actions.SWITCH_OFF,
//         target: 'led',
//         key: eventArgs.payload
//     }
// }

// factory[Actions.TOGGLE_SWITCH] = (eventArgs) => {
//     return (dispatch, getstate) => {
//         let speed = getstate()['switchReducer'][eventArgs.payload]
//         let payload = {
//             value: speed ? 'off' : 'on'
//         }
//         let action = {
//             type: speed ? Actions.SWITCH_OFF : Actions.SWITCH_ON,
//             target: 'led',
//             key: eventArgs.payload
//         }
//         send(dispatch, urlSwitch + eventArgs.payload, payload, action)
//     }
// }

// factory[Actions.GET_SWITCH] = (eventArgs) => {
//     return {
//         type: Actions.GET_SWITCH,
//         target: 'led',
//         key: eventArgs.payload
//     }
// }

// factory[Actions.ADJUST_SPEED] = (eventArgs) => {
//     return (dispatch, getstate) => {
//         let speed = getstate()['powerReducer']['speed']
//         if (eventArgs.coordinates.theta > 0.5 * Math.PI) {
//             speed += 10
//         } else {
//             speed -= 10
//         }
//         speed = Math.max(Math.min(100, speed), 0)
//         let power = speed <= 0 ? 0 : speed + 150
//         let payload = {
//             target: 'motor',
//             value: power
//         }
//         let action = {
//             type: Actions.SET_POWER,
//             value: speed
//         }
//         send(dispatch, urlMotor, payload, action)
//     }
// }

// factory[Actions.SET_POWER_OFF] = (eventArgs) => {
//     return (dispatch, getstate) => {
//         let payload = {
//             target: 'motor',
//             value: 0
//         }
//         let action = {
//             type: Actions.SET_POWER_OFF
//         }
//         send(dispatch, urlMotor, payload, action)
//     }
// }

// factory[Actions.ADJUST_TURN] = (eventArgs) => {
//     console.log(eventArgs)
//     return (dispatch, getstate) => {
//         let turn = getstate()['powerReducer']['turn']
//         let speed = getstate()['powerReducer']['speed']
//         turn += eventArgs.payload === 'left' ? -10 : 10
//         speed = Math.max(Math.min(100, speed), 0)
//         let power = speed <= 0 ? 0 : speed + 150
//         power -= Math.abs(turn)
//         let payload = {
//             target: 'motor',
//             key: eventArgs.payload === 'left' ? 'A' : 'B',
//             value: power
//         }
//         let action = {
//             type: Actions.SET_TURN,
//             value: turn
//         }
//         send(dispatch, urlMotor, payload, action)
//     }
// }

// factory[Actions.SET_TURN_OFF] = (eventArgs) => {
//     return (dispatch, getstate) => {
//         let speed = getstate()['powerReducer']['speed']
//         let power = speed <= 0 ? 0 : speed + 150
//         let payload = {
//             target: 'motor',
//             value: power
//         }
//         let action = {
//             type: Actions.SET_TURN_OFF
//         }
//         send(dispatch, urlMotor, payload, action)
//     }
// }

factory[Actions.FORWARD] = (speed) => {
    return (dispatch, getstate) => {
        let action = {
            type: Action.FORWARD,
            payload: { speed: speed }
        }
        send(dispatch, motorUrl, action)
    }
}

factory[Actions.REVERSE] = (speed) => {
    return (dispatch, getstate) => {
        let action = {
            type: Action.REVERSE,
            payload: { speed: speed }
        }
        send(dispatch, motorUrl, action)
    }
}

factory[Actions.THROTTLE] = (speed) => {
    return (dispatch, getstate) => {
        let action = {
            type: Action.THROTTLE,
            payload: { speed: speed }
        }
        send(dispatch, motorUrl, action)
    }
}

factory[Actions.STOP] = () => {
    return (dispatch, getstate) => {
        let action = {
            type: Action.STOP,
            payload: { speed: 0 }
        }
        send(dispatch, motorUrl, action)
    }
}



function send(dispatch, endpoint, action) {
    fetch(endpoint + '/' + action.type, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
    })
        .then(checkStatus)
        .then(parseJSON)
        .then(data => {
            dispatch(Object.assign(action, data))
        })
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

function parseJSON(response) {
    return response.json()
}

export default factory
