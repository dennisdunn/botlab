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
        let bluestyle={fill:this.props.button.blue ? 'royalblue':'darkblue'}
        let greenstyle={fill:this.props.button.green ? 'limegreen':'darkgreen'}
        let yellowstyle={fill:this.props.button.yellow ? 'yellow':'goldenrod'}
        let redstyle={fill:this.props.button.red ? 'red':'darkred'}
        return <g id={this.props.id}>
            <Wedge onClick={this.on_0_Clicked} styles={bluestyle} innerRight={{ r: 90, theta: Math.PI * 9 / 8 }} outerLeft={{ r: 150, theta: Math.PI * 21 / 16 }}></Wedge>
            <Wedge onClick={this.on_1_Clicked} styles={greenstyle} innerRight={{ r: 90, theta: Math.PI * 21 / 16 }} outerLeft={{ r: 150, theta: Math.PI * 3 / 2 }}></Wedge>
            <Wedge onClick={this.on_2_Clicked} styles={yellowstyle} innerRight={{ r: 90, theta: Math.PI * 3 / 2 }} outerLeft={{ r: 150, theta: Math.PI * 27 / 16 }}></Wedge>
            <Wedge onClick={this.on_3_Clicked} styles={redstyle} innerRight={{ r: 90, theta: Math.PI * 27 / 16 }} outerLeft={{ r: 150, theta: Math.PI * 15 / 8 }}></Wedge>
        </g>
    }
}

const mapStateToProps = (state) => {
    return { button: state.Button }
}

const mapDispatchToProps = (dispatch) => {
    return {
        executeSwitch: (action, button) => {
            dispatch(ActionCreator[action](button))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonControl)