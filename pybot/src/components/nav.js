import React from 'react'
import { connect } from 'react-redux'
import Wedge from './wedge'
import Actions from '../lib/actions/actions'
import ActionCreator from '../lib/actions/actionCreators'

class NavControl extends React.Component {
    constructor(props) {
        super(props)
        this.handleLeftTurn=this.handleLeftTurn.bind(this)
        this.handleRightTurn= this.handleRightTurn.bind(this)
        this.handleCancelTurn=this.handleCancelTurn.bind(this)
    }

    handleLeftTurn(e) {
        e.stopPropagation()
        e.preventDefault()
        this.props.executeTurn(Actions.TURN_LEFT)
    }

    handleRightTurn(e) {
        e.stopPropagation()
        e.preventDefault()
        this.props.executeTurn(Actions.TURN_RIGHT)
    }

    handleCancelTurn(e) {
        e.stopPropagation()
        e.preventDefault()
        this.props.executeTurn(Actions.TURN_STRAIGHT)
    }

    render() {
        return <g id={this.props.id}>
            <Wedge onMouseDown={this.handleLeftTurn} onMouseUp={this.handleCancelTurn} onTouchStart={this.handleLeftTurn} onTouchEnd={this.handleCancelTurn} styles={{ fill: "lightgreen" }} outerLeft={{ r: 150, theta: Math.PI * 1.1 }} innerRight={{ r: 90, theta: Math.PI * 5 / 8 }}></Wedge>
            <Wedge onClick={this.handleCancelTurn} onTouchTap={this.handleCancelTurn} styles={{ fill: "green" }} outerLeft={{ r: 150, theta: Math.PI * 5 / 8 }} innerRight={{ r: 90, theta: Math.PI * 3 / 8 }}></Wedge>
            <Wedge onMouseDown={this.handleRightTurn} onMouseUp={this.handleCancelTurn}styles={{ fill: "lightgreen" }} onTouchStart={this.handleRightTurn} onTouchEnd={this.handleCancelTurn} outerLeft={{ r: 150, theta: Math.PI * 3 / 8 }} innerRight={{ r: 90, theta: Math.PI * 1.9 }}></Wedge>
        </g>
    }
}

const mapStateToProps = (state) => {
    return Object.assign({}, state.Nav )
}

const mapDispatchToProps = (dispatch) => {
    return {
        executeTurn: (action) => {
            dispatch(ActionCreator[action]())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavControl)
