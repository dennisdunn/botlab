import React from 'react'

export class GraphicsComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidUpdate() {
        if (this.props.ctx) {
            this.draw()
            this.props.onUpdate();
        }
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
        this.props.ctx.moveTo(this.props.from.x, this.props.from.y)
        this.props.ctx.lineTo(this.props.to.x, this.props.to.y)
    }
}

export class Arc extends GraphicsComponent {
    constructor(props) {
        super(props)
    }

    draw() {
        this.props.ctx.arcTo(this.props.from.x, this.props.from.y, this.props.to.x, this.props.to.y, this.props.radius)
        this.props.ctx.moveTo(this.props.from.x, this.props.from.y)
        this.props.ctx.lineTo(this.props.to.x, this.props.to.y)
    }
}

export class Circle extends GraphicsComponent {
    constructor(props) {
        super(props)
    }

    draw() {
        this.props.ctx.moveTo(this.props.center.x + this.props.radius, this.props.center.y)
        this.props.ctx.arc(this.props.center.x, this.props.center.y, this.props.radius, 0, 2 * Math.PI)
    }
}