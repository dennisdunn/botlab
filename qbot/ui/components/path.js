import React from 'react'

export default class Path extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            path: new Path2D()
        }
        this.draw = this.draw.bind(this)
        this.isHitInZone = this.isHitInZone.bind(this)
    }

    isHitInZone(e) {
        return this.props.graphicsContext.isPointInPath(this.state.path, e.clientX, e.clientY)
    }

    draw() {
        if (this.props.graphicsContext) {
            if (this.props.fill) {
                this.props.graphicsContext.fillStyle = this.props.fill
                this.props.graphicsContext.fill(this.state.path)
            }
            if (this.props.stroke) {
                this.props.graphicsContext.strokeStyle = this.props.stroke
                this.props.graphicsContext.stroke(this.state.path)
            }
        }
    }

    render() {
        const childProps = { path: this.state.path, onDraw: this.draw }
        const children = React.Children.map(this.props.children, child => React.cloneElement(child, childProps))

        return <div>{children}</div>
    }
}

