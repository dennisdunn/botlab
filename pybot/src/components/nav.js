import React from 'react'
import { connect } from 'react-redux'
import Wedge from './wedge'

class NavControl extends React.Component {
    constructor(props) {
        super(props)
        this.onLeftClicked.bind(this)
        this.onRightClicked.bind(this)
        this.onStraightClicked.bind(this)
    }

    onLeftClicked() {
        alert('left')
    }

    onRightClicked() {
        alert('right')
    }

    onStraightClicked() {
        alert('straight')
    }

    render() {
        return <g id={this.props.id}>
            <Wedge onClick={this.onLeftClicked} color="lightgreen" origin={{ x: 150, y: 150 }} upperLeft={{ r: 150, theta: Math.PI *10/8}} lowerRight={{ r: 90, theta: Math.PI*5/8}}></Wedge>
            <Wedge onClick={this.onStraightClicked} color="green" origin={{ x: 150, y: 150 }} upperLeft={{ r: 150, theta: Math.PI *5/8}} lowerRight={{ r: 90, theta: Math.PI*3/8}}></Wedge>
            <Wedge onClick={this.onRightClicked} color="lightgreen" origin={{ x: 150, y: 150 }} upperLeft={{ r: 150, theta: Math.PI *3/8}} lowerRight={{ r: 90, theta: Math.PI*14/8}}></Wedge>
        </g>
    }
}

export default connect(state => state.nav || {})(NavControl)