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
        let current = getstate()['switchReducer'][eventArgs.payload]
        let payload = {
            value: current ? 'off' : 'on'
        }
        let action = {
            type: current ? Actions.SWITCH_OFF : Actions.SWITCH_ON,
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

factory[Actions.SET_POWER] = (eventArgs) => {
    return (dispatch, getstate) => {
        let state = getstate()['powerReducer']
        const delta = (state.max - state.min) / 10
        let current = state.current
        if (eventArgs.coordinates.theta > 0.5 * Math.PI) {
            current += delta
        } else {
            state.current -= delta
        }
        current = Math.clip(current, state.min, state.max)
        let payload = {
            value: current
        }
        let action = {
            type: Actions.SET_POWER,
            value: current
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

factory[Actions.SET_TURN] = (eventArgs) => {
    return (dispatch, getstate) => {
        let current = getstate()['powerReducer']['current']
        let payload = {
            value: current
        }
        let action = {
            type: Actions.SET_POWER,
            value: current
        }
        send(dispatch, urlMotor, payload, action)
    }
}

factory[Actions.SET_TURN_OFF] = (eventArgs) => {
    return (dispatch, getstate) => {
        let current = getstate()['powerReducer']['current']
        let payload = {
            value: current
        }
        let action = {
            type: Actions.SET_POWER,
            value: current
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

Math.clip = function (number, min, max) {
    return Math.max(min, Math.min(number, max));
}

export default factory
