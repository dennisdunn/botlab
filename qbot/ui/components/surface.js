import React from 'react'
import CoordinateTransforms from '../lib/coordinateTransforms'
import * as Actions from '../lib/actions'

/**
 * Provide a surface to draw on.
 */
export default class Surface extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        React.Children.map(this.props.children, child => {
            child.props.service = this.coordService
        })
    }

    render() {
        return (
            <div style={{ position: 'absolute' }}>
                <canvas id={this.props.id}
                    width={this.props.size}
                    height={this.props.size}
                    onClick={this.clickHandler}>
                </canvas>
            </div >
        );
    }
}