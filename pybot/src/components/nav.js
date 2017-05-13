import React from 'react'
import { connect } from 'react-redux'
import Wedge from './wedge'
import Actions from '../lib/actions/actions'
import ActionCreator from '../lib/actions/actionCreators'

class NavControl extends React.Component {
    constructor(props) {
        super(props)
        this.onLeftClicked.bind(this)
        this.onRightClicked.bind(this)
        this.onStraightClicked.bind(this)
}

    onLeftClicked() {
        ActionCreator[Actions.TURN_LEFT]()
    }

    onRightClicked() {
        ActionCreator[Actions.TURN_RIGHT]()
    }

    onStraightClicked() {
        ActionCreator[Actions.TURN_STRAIGHT]()
    }

    render() {
        return <g id={this.props.id}>
            <Wedge onClick={this.onLeftClicked} styles={{fill:"lightgreen"}} outerLeft={{ r: 150, theta: Math.PI *1.1}} innerRight={{ r: 90, theta: Math.PI*5/8}}></Wedge>
            <Wedge onClick={this.onStraightClicked} styles={{fill:"green"}} outerLeft={{ r: 150, theta: Math.PI *5/8}} innerRight={{ r: 90, theta: Math.PI*3/8}}></Wedge>
            <Wedge onClick={this.onRightClicked} styles={{fill:"lightgreen"}} outerLeft={{ r: 150, theta: Math.PI *3/8}} innerRight={{ r: 90, theta: Math.PI*1.9}}></Wedge>
        </g>
    }
}

export default connect(state => state.nav || {})(NavControl)