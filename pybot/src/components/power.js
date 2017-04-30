import React from 'react'
import { connect } from 'react-redux'
import ActionFactory from '../lib/actions/actionCreators'
import Actions from '../lib/actions/actions'

class PowerControl extends React.Component {
    constructor(props) {
        super(props)
        this.onReverseClicked.bind(this)
        this.onForwardClicked.bind(this)
        this.onThrottleClicked.bind(this)
        this.onStopClicked.bind(this)

        console.log(ActionFactory)
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
        return <div>
            <button onClick={this.onReverseClicked}>reverse</button>
            <button onClick={this.onForwardClicked}>forward</button>
            <button onClick={this.onThrottleClicked}>throttle</button>
            <button onClick={this.onStopClicked}>stop</button>
        </div>
    }
}

export default connect(state => state.power || {})(PowerControl)