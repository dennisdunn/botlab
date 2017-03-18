import React from 'react'

export default class Path extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            path: new Path2D()
        }
        this.draw = this.draw.bind(this)
        this.hitTest = this.hitTest.bind(this)
    }

    hitTest(e) {
        if (this.props.onClick && this.props.graphicsContext.isPointInPath(this.state.path, e.clientX, e.clientY)) {
            this.props.onClick(e)
        }
    }

    componentDidMount() {
        if (this.props.register) this.props.register(this.hitTest)
    }

    draw() {
        if (this.props.graphicsContext) {
            const context = Object.assign(this.props.graphicsContext, this.props)
            if (this.props.fillStyle) context.fill(this.state.path)
            if (this.props.strokeStyle) context.stroke(this.state.path)
        }
    }

    render() {
        const childProps = { path: this.state.path, onDraw: this.draw }
        const children = React.Children.map(this.props.children, child => React.cloneElement(child, childProps))

        return <div>{children}</div>
    }
}

