import React from 'react'
import { connect } from 'react-redux'
import Wedge from './wedge'

class ButtonControl extends React.Component {
    constructor(props) {
        super(props)
        this.on_0_Clicked.bind(this)
        this.on_1_Clicked.bind(this)
        this.on_2_Clicked.bind(this)
        this.on_3_Clicked.bind(this)
    }

    on_0_Clicked() {
        alert('button 0')
    }

    on_1_Clicked() {
        alert('button 1')
    }

    on_2_Clicked() {
        alert('button 2')
    }

    on_3_Clicked() {
        alert('button 3')
    }

    render() {
        return <g id={this.props.id}>
            <Wedge onClick={this.on_0_Clicked} color="red" origin={{ x: 150, y: 150 }} lowerRight={{ r: 90, theta: Math.PI * 9 / 8 }} upperLeft={{ r: 150, theta: Math.PI * 21 / 16 }}></Wedge>
            <Wedge onClick={this.on_1_Clicked} color="green" origin={{ x: 150, y: 150 }} lowerRight={{ r: 90, theta: Math.PI * 21 / 16 }} upperLeft={{ r: 150, theta: Math.PI * 3 / 2 }}></Wedge>
            <Wedge onClick={this.on_2_Clicked} color="orange" origin={{ x: 150, y: 150 }} lowerRight={{ r: 90, theta: Math.PI * 3 / 2 }} upperLeft={{ r: 150, theta: Math.PI * 27 / 16 }}></Wedge>
            <Wedge onClick={this.on_3_Clicked} color="blue" origin={{ x: 150, y: 150 }} lowerRight={{ r: 90, theta: Math.PI * 27 / 16 }} upperLeft={{ r: 150, theta: Math.PI * 15 / 8 }}></Wedge>
        </g>
    }
}

export default connect(state => state.button || {})(ButtonControl)