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
        this.props.executeTurn(Actions.TURN_LEFT)
    }

    handleRightTurn(e) {
        this.props.executeTurn(Actions.TURN_RIGHT)
    }

    handleCancelTurn(e) {
        this.props.executeTurn(Actions.TURN_STRAIGHT)
    }

    render() {
        return <g id={this.props.id}>
            <Wedge onmousedown={this.handleLeftTurn} onmouseup={this.handleCancelTurn} styles={{ fill: "lightgreen" }} outerLeft={{ r: 150, theta: Math.PI * 1.1 }} innerRight={{ r: 90, theta: Math.PI * 5 / 8 }}></Wedge>
            <Wedge onClick={this.handleCancelTurn} styles={{ fill: "green" }} outerLeft={{ r: 150, theta: Math.PI * 5 / 8 }} innerRight={{ r: 90, theta: Math.PI * 3 / 8 }}></Wedge>
            <Wedge onmousedown={this.handleLeftTurn} onmouseup={this.handleCancelTurn}styles={{ fill: "lightgreen" }} outerLeft={{ r: 150, theta: Math.PI * 3 / 8 }} innerRight={{ r: 90, theta: Math.PI * 1.9 }}></Wedge>
        </g>
    }
}

const mapStateToProps = (state) => {
    return { nav: state.Nav }
}

const mapDispatchToProps = (dispatch) => {
    return {
        executeTurn: (action, timeout) => {
            dispatch(ActionCreator[action](timeout))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavControl)