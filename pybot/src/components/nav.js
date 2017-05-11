import React from 'react'
import { connect } from 'react-redux'
import Coord from '../lib/coordinateTransforms'
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
        return <g>
            <Wedge onClick={this.onLeftClicked} color="lightgreen" origin={{ x: 150, y: 150 }} upperLeft={{ r: 150, theta: Math.PI }} lowerRight={{ r: 100, theta: Math.PI/2}}></Wedge>
        </g>


        {/*<div>
            <button onClick={this.onLeftClicked}>left</button>
            <button onClick={this.onStraightClicked}>straight</button>
            <button onClick={this.onRightClicked}>right</button>
        </div>*/}
    }
}

export default connect(state => state.nav || {})(NavControl)