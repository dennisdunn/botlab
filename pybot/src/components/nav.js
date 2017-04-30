import React from 'react'
import { connect } from 'react-redux'

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
        return <div>
            <button onClick={this.onLeftClicked}>left</button>
            <button onClick={this.onStraightClicked}>straight</button>
            <button onClick={this.onRightClicked}>right</button>
        </div>
    }
}

export default connect(state => state.nav || {})(NavControl)