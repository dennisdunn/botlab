import React from 'react'
import { connect } from 'react-redux'
import Wedge from './wedge'
import Actions from '../lib/actions/actions'
import ActionCreator from '../lib/actions/actionCreators'

class NavControl extends React.Component {
    constructor(props) {
        super(props)
        this.onLeftClicked=this.onLeftClicked.bind(this)
        this.onRightClicked= this.onRightClicked.bind(this)
        this.onStraightClicked=this.onStraightClicked.bind(this)
    }

    onLeftClicked(e) {
        this.props.executeTurn(Actions.TURN_LEFT ,1)
    }

    onRightClicked(e) {
        this.props.executeTurn(Actions.TURN_RIGHT, 1)
    }

    onStraightClicked(e) {
        this.props.executeTurn(Actions.TURN_STRAIGHT)
    }

    render() {
        return <g id={this.props.id}>
            <Wedge onClick={this.onLeftClicked} styles={{ fill: "lightgreen" }} outerLeft={{ r: 150, theta: Math.PI * 1.1 }} innerRight={{ r: 90, theta: Math.PI * 5 / 8 }}></Wedge>
            <Wedge onClick={this.onStraightClicked} styles={{ fill: "green" }} outerLeft={{ r: 150, theta: Math.PI * 5 / 8 }} innerRight={{ r: 90, theta: Math.PI * 3 / 8 }}></Wedge>
            <Wedge onClick={this.onRightClicked} styles={{ fill: "lightgreen" }} outerLeft={{ r: 150, theta: Math.PI * 3 / 8 }} innerRight={{ r: 90, theta: Math.PI * 1.9 }}></Wedge>
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