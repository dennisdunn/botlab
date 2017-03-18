import React from 'react'

export default class Path extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            path: new Path2D()
        }
    }

    draw() {
        if (this.props.graphics) {
            if (this.props.fill) graphics.fill()
            if (this.props.stroke) graphics.stroke()
        }
    }

    render() {
        const childProps = { path: this.state.path }
        const children = React.Children.map(this.props.children, child => React.cloneElement(child, childProps))

        return (
            { children }
        );
    }
}

