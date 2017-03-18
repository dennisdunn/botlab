import React from 'react'

class GraphicsComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidUpdate() {
        if (this.props.path) this.draw()
        if (this.props.onDraw) this.props.onDraw()
    }

    render() {
        return null
    }
}

export class Line extends GraphicsComponent {
    constructor(props) {
        super(props)
    }

    draw() {
        this.props.path.moveTo(this.props.from.x, this.props.from.y)
        this.props.path.lineTo(this.props.to.x, this.props.to.y)
    }
}

export class Arc extends GraphicsComponent {
    constructor(props) {
        super(props)
    }

    draw() {
        this.props.path.arc(this.props.origin.x, this.props.origin.y, this.props.radius, this.props.start, this.props.end, this.props.ccw || false)
     }
}

export class Circle extends GraphicsComponent {
    constructor(props) {
        super(props)
    }

    draw() {
        this.props.path.moveTo(this.props.center.x + this.props.radius, this.props.center.y)
        this.props.path.arc(this.props.center.x, this.props.center.y, this.props.radius, 0, 2 * Math.PI)
    }
}