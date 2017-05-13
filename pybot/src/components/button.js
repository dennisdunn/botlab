import React from 'react'
import { connect } from 'react-redux'
import Wedge from './wedge'
import Actions from '../lib/actions/actions'
import ActionCreator from '../lib/actions/actionCreators'

class ButtonControl extends React.Component {
    constructor(props) {
        super(props)
        this.on_0_Clicked=this.on_0_Clicked.bind(this)
        this.on_1_Clicked=  this.on_1_Clicked.bind(this)
        this.on_2_Clicked=  this.on_2_Clicked.bind(this)
        this.on_3_Clicked=  this.on_3_Clicked.bind(this)
    }

    on_0_Clicked(e) {
        this.props.executeSwitch(Actions.TOGGLE_SWITCH,'blue')
    }

    on_1_Clicked(e) {
        this.props.executeSwitch(Actions.TOGGLE_SWITCH,'green')
    }

    on_2_Clicked(e) {
        this.props.executeSwitch(Actions.TOGGLE_SWITCH,'yellow')
    }

    on_3_Clicked(e) {
        this.props.executeSwitch(Actions.TOGGLE_SWITCH,'red')
    }

    render() {
        return <g id={this.props.id}>
            <Wedge onClick={this.on_0_Clicked} styles={{fill:"blue"}} innerRight={{ r: 90, theta: Math.PI * 9 / 8 }} outerLeft={{ r: 150, theta: Math.PI * 21 / 16 }}></Wedge>
            <Wedge onClick={this.on_1_Clicked} styles={{fill:"green"}} innerRight={{ r: 90, theta: Math.PI * 21 / 16 }} outerLeft={{ r: 150, theta: Math.PI * 3 / 2 }}></Wedge>
            <Wedge onClick={this.on_2_Clicked} styles={{fill:"yellow"}} innerRight={{ r: 90, theta: Math.PI * 3 / 2 }} outerLeft={{ r: 150, theta: Math.PI * 27 / 16 }}></Wedge>
            <Wedge onClick={this.on_3_Clicked} styles={{fill:"red"}} innerRight={{ r: 90, theta: Math.PI * 27 / 16 }} outerLeft={{ r: 150, theta: Math.PI * 15 / 8 }}></Wedge>
        </g>
    }
}

const mapStateToProps = (state) => {
    return { button: state.button }
}

const mapDispatchToProps = (dispatch) => {
    return {
        executeSwitch: (action, button) => {
            dispatch(ActionCreator[action](button))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonControl)