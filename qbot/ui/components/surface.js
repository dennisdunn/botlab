import React from 'react'
import CoordinateTransforms from '../lib/coordinateTransforms'
import * as Actions from '../lib/actions'

/**
 * Provide a surface to draw on.
 */
export default class Surface extends React.Component {
    constructor(props) {
        super(props)
        this.paint = this.paint.bind(this)
    }

    paint() {
        let translate = new CoordinateTransforms({
            x: this.props.size / 2,
            y: this.props.size / 2
        })
        let context = document.getElementById(this.props.id)
        React.Children.forEach(this.props.children, child => {
            let path = child.type.prototype.getPath(translate)
            let styles = child.props.styles || {}
            Object.assign(context, styles)
            context.fill(path)
            context.stroke(path)
        })
    }

    componentDidMount() {
        this.paint()
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