import React from 'react'
import { connect } from 'react-redux'
import Semi from './semi'
import Actions from '../lib/actions/actions'
import ActionCreator from '../lib/actions/actionCreators'

class PowerControl extends React.Component {
    constructor(props) {
        super(props)
        this.handleSetThrottle = this.handleSetThrottle.bind(this)
        this.handleStop = this.handleStop.bind(this)
    }

    handleSetThrottle(e) {
        this.props.executeThrottle(Actions.SET_THROTTLE, 50)
    }

    handleStop(e) {
        this.props.executeThrottle(Actions.SET_THROTTLE, 0)
    }

    render() {
        return <g id={this.props.id}>
            <Semi onClick={this.handleSetThrottle} styles={{ fill: "lightblue" }} fat='true' start={{ r: 80, theta: Math.PI * 9 / 8 }} end={{ r: 80, theta: Math.PI * 15 / 8 }}></Semi>
            <Semi onClick={this.handleStop} styles={{ fill: "blue" }} start={{ r: 80, theta: Math.PI * 15 / 8 }} end={{ r: 80, theta: Math.PI * 9 / 8 }}></Semi>
        </g>
    }
}

const mapStateToProps = (state) => {
    return { power: state.Power }
}

const mapDispatchToProps = (dispatch) => {
    return {
        executeThrottle: (action, power) => {
            dispatch(ActionCreator[action](power))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PowerControl)