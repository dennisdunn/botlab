import React from 'react'
import { connect } from 'react-redux'
import ActionFactory from '../lib/actions/actionCreators'
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
        ActionFactory[Actions.FORWARD](50)
    }

    onReverseClicked() {
        ActionFactory[Actions.REVERSE](50)
    }

    onThrottleClicked() {
        ActionFactory[Actions.THROTTLE](50)
    }

    onStopClicked() {
        ActionFactory[Actions.STOP]()
    }

    render() {
        return <g id={this.props.id}>
            <Semi onClick={this.onForwardClicked} color="lightblue" origin={{ x: 150, y: 150 }} fat='true' start={{r:90, theta:Math.PI * 9/8}} end={{r:90, theta:Math.PI * 15/8}}></Semi>
            <Semi onClick={this.onStopClicked} color="blue" origin={{ x: 150, y: 150 }} start={{r:90, theta:Math.PI * 15/8}} end={{r:90, theta:Math.PI * 9/8}}></Semi>
        </g>
    }
}

export default connect(state => state.power || {})(PowerControl)