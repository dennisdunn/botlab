import * as Actions from './actions'

/**
 * Actions need a target (led, motor), key (red, blue, A, etc),
 * and value (on, off, 150, etc)
 */
let factory = {}

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
        dispatch({
            type: current ? Actions.SWITCH_OFF : Actions.SWITCH_ON,
            target: 'led',
            key: eventArgs.payload
        })
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
    return {
        type: Actions.SET_POWER,
        payload: eventArgs.coordinates
    }
}

factory[Actions.SET_POWER_OFF] = (eventArgs) => {
    return {
        type: Actions.SET_POWER_OFF,
        payload: null
    }
}

factory[Actions.SET_TURN] = (eventArgs) => {
    return {
        type: Actions.SET_TURN,
        payload: eventArgs.coordinates
    }
}

factory[Actions.SET_TURN_OFF] = (eventArgs) => {
    return {
        type: Actions.SET_TURN_OFF,
        payload: null
    }
}

export default factory
