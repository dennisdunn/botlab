import * as Actions from './actions'
require('es6-promise').polyfill()
require('isomorphic-fetch')
/**
 * Actions need a target (led, motor), key (red, blue, A, etc),
 * and value (on, off, 150, etc)
 */
let factory = {}
const urlSwitch = 'http://192.168.0.13:8080/api/v1/led/'
const urlMotor = 'http://192.168.0.13:8080/api/v1/motor/'

factory[Actions.SWITCH_ON] = (eventArgs) => {
    return {
        type: Actions.SWITCH_ON,
        target: 'led',
        key: eventArgs.payload
    }
}

factory[Actions.SWITCH_OFF] = (eventArgs) => {
    return {
        type: Actions.SWITCH_OFF,
        target: 'led',
        key: eventArgs.payload
    }
}

factory[Actions.TOGGLE_SWITCH] = (eventArgs) => {
    return (dispatch, getstate) => {
        let speed = getstate()['switchReducer'][eventArgs.payload]
        let payload = {
            value: speed ? 'off' : 'on'
        }
        let action = {
            type: speed ? Actions.SWITCH_OFF : Actions.SWITCH_ON,
            target: 'led',
            key: eventArgs.payload
        }
        send(dispatch, urlSwitch + eventArgs.payload, payload, action)
    }
}

factory[Actions.GET_SWITCH] = (eventArgs) => {
    return {
        type: Actions.GET_SWITCH,
        target: 'led',
        key: eventArgs.payload
    }
}

factory[Actions.ADJUST_SPEED] = (eventArgs) => {
    return (dispatch, getstate) => {
        let speed = getstate()['powerReducer']['speed']
        if (eventArgs.coordinates.theta > 0.5 * Math.PI) {
            speed += 10
        } else {
            speed -= 10
        }
        speed = Math.max(Math.min(100, speed), 0)
        let power = speed <= 0 ? 0 : speed + 150
        let payload = {
            value: power
        }
        let action = {
            type: Actions.SET_POWER,
            value: speed
        }
        send(dispatch, urlMotor, payload, action)
    }
}

factory[Actions.SET_POWER_OFF] = (eventArgs) => {
    return (dispatch, getstate) => {
        let payload = {
            value: 0
        }
        let action = {
            type: Actions.SET_POWER,
            value: 0
        }
        send(dispatch, urlMotor, payload, action)
    }
}

factory[Actions.TURN_LEFT] = (eventArgs) => {
        let speed = getstate()['powerReducer']['speed']
    return (dispatch, getstate) => {
        let payload = {
            value: speed - 10 + 150,
            key:'A'
        }
        let action = {
            type: Actions.SET_TURN,
            value: 10
        }
        send(dispatch, urlMotor, payload, action)
    }
}

factory[Actions.TURN_RIGHT] = (eventArgs) => {
    return (dispatch, getstate) => {
        let payload = {
            value: 0,
            key:'B'
        }
        let action = {
            type: Actions.SET_POWER,
            value: 10
        }
        send(dispatch, urlMotor, payload, action)
    }
}

factory[Actions.SET_TURN] = (eventArgs) => {
    return (dispatch, getstate) => {
        let speed = getstate()['powerReducer']['speed']
        let payload = {
            value: speed
        }
        let action = {
            type: Actions.SET_POWER,
            value: speed
        }
        send(dispatch, urlMotor, payload, action)
    }
}

factory[Actions.SET_TURN_OFF] = (eventArgs) => {
    return (dispatch, getstate) => {
        let speed = getstate()['powerReducer']['speed']
        let power = speed <= 0 ? 0 : speed + 150
        let payload = {
            value: power 
        }
        let action = {
            type: Actions.SET_POWER,
            value: speed
        }
        send(dispatch, urlMotor, payload, action)
    }
}

function send(dispatch, endpoint, payload, action) {
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
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
