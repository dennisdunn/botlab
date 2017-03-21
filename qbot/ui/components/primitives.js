import React from 'react'

class GraphicsComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (this.props.path) this.addToPath()
    }

    render() {
        return null
    }
}

export class Line extends GraphicsComponent {
    constructor(props) {
        super(props)
    }

    addToPath() {
        const to = this.coordinatesToDom(this.props.to)
        this.props.path.lineTo(to.x, to.y)
    }
}

export class Move extends GraphicsComponent {
    constructor(props) {
        super(props)
    }

    addToPath() {
        const to = this.coordinatesToDom(this.props.to)
        this.props.path.moveTo(to.x, to.y)
    }
}

export class Arc extends GraphicsComponent {
    constructor(props) {
        super(props)
    }

    addToPath() {
        const origin = this.coordinatesToDom(this.props.origin)
        this.props.path.arc(origin.x, origin.y, this.props.radius, this.props.start, this.props.end, this.props.ccw)
    }
}

export class Circle extends GraphicsComponent {
    constructor(props) {
        super(props)
    }

    addToPath() {
        const center = this.coordinatesToDom(this.props.center)
        this.props.path.arc(center.x, center.y, this.props.radius, 0, 2 * Math.PI)
    }
}