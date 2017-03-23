import * as Actions from './actions'

let factory = {}

factory[Actions.SWITCH_ON] = (eventArgs) => {
    return {
        type: Actions.SWITCH_ON,
        payload: eventArgs.payload
    }
}

factory[Actions.SWITCH_OFF] = (eventArgs) => {
    return {
        type: Actions.SWITCH_OFF,
        payload: eventArgs.payload
    }
}

factory[Actions.TOGGLE_SWITCH] = (eventArgs) => {
    return {
        type: Actions.TOGGLE_SWITCH,
        payload: eventArgs.payload
    }
}

factory[Actions.GET_SWITCH] = (eventArgs) => {
    return {
        type: Actions.GET_SWITCH,
        payload: eventArgs.payload
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
