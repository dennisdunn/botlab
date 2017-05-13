import React from 'react'
import { connect } from 'react-redux'
import ActionCreator from '../lib/actions/actionCreators'
import Actions from '../lib/actions/actions'
import Semi from './semi'

class PowerControl extends React.Component {
    constructor(props) {
        super(props)
        this.onReverseClicked.bind(this)
        this.onForwardClicked.bind(this)
        this.onThrottleClicked.bind(this)
        this.onStopClicked.bind(this)
    }

    onForwardClicked() {
        ActionCreator[Actions.SET_DIRECTION_FORWARD](50)
    }

    onReverseClicked() {
        ActionCreator[Actions.SET_DIRECTION_FORWARD](50)
    }

    onThrottleClicked() {
        ActionCreator[Actions.SET_THROTTLE](50)
    }

    onStopClicked() {
        ActionCreator[Actions.SET_THROTTLE_ZERO]()
    }

    render() {
        return <g id={this.props.id}>
            <Semi onClick={this.onForwardClicked} styles={{fill:"lightblue"}} fat='true' start={{ r: 80, theta: Math.PI * 9 / 8 }} end={{ r: 80, theta: Math.PI * 15 / 8 }}></Semi>
            <Semi onClick={this.onStopClicked} styles={{fill:"blue"}} start={{ r: 80, theta: Math.PI * 15 / 8 }} end={{ r: 80, theta: Math.PI * 9 / 8 }}></Semi>
        </g>
    }
}

export default connect(state => state.power || {})(PowerControl)