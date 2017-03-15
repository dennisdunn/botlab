import React from 'react'

/**
 * A control surface reports on mouse actions in
 * pre-defined "hot zones." Hot zones are closed
 * paths on the control surface.
 */
export class Surface extends React.Component {
    constructor(props) {
        super(props)

        this.tracking = false
        this.ctx = null

        this.mousedownHandler = this.mousedownHandler.bind(this)
        this.mouseupHandler = this.mouseupHandler.bind(this)
        this.mousemoveHandler = this.mousemoveHandler.bind(this)

        this.clickHandler = this.clickHandler.bind(this)

        this.refCallback = this.refCallback.bind(this)
        
        this.childContextTypes = {
            graphics: React.PropTypes.any
        }

    }

    getChildContext() {
        return { graphics: this._graphicsContext };
    }

    clickHandler(e) {
        if (this.isHitInZone(e)) {
            e.preventDefault()
            this.props.onClick({ x: e.clientX, y: e.clientY })
        }
    }

    refCallback(el) {
        this._graphicsContext = el.getContext('2d')
    }

    getContext() {
        return this.ctx
    }

    mousedownHandler(e) {
        if (this.isHitInZone(e)) {
            e.preventDefault()
            this.setState({ tracking: true })
        }
    }

    mouseupHandler(e) {
        if (this.state.tracking) {
            e.preventDefault()
            this.setState({ tracking: false })
        }
    }

    mousemoveHandler(e) {
        if (this.state.tracking && this.isHitInZone(e)) {
            e.preventDefault()
            this.props.onMouse({ x: e.clientX, y: e.clientY })
        }
    }

    isHitInZone(e) {
        return this.ctx.isPointInPath(e.clientX, e.clientY)
    }

    componentDidMount() {
        this.ctx.fillStyle = this.props.fill || "white"
        this.ctx.strokeStyle = this.props.stroke || "black"
        this.ctx.fill()
        this.ctx.stroke()
    }

    render() {
        return (
            <canvas id={this.props.id}
                width={this.props.width || 300}
                height={this.props.height || 150}
                onMouseDown={this.mousedownHandler}
                onMouseUp={this.mouseupHandler}
                onMouseMove={this.mousemoveHandler}
                onClick={this.clickHandler}
                ref={this.refCallback}>
            </canvas>
        );
    }
}

export class Arc extends React.Component {
    constuctor(props) {
        super(props)
    }

    componentDidMount() {
        let ctx = this.context.graphics
        ctx.arcTo(this.props.from.x, this.props.from.y, this.props.to.x, this.props.to.y, this.props.radius)
        ctx.moveTo(this.props.from.x, this.props.from.y)
        ctx.lineTo(this.props.to.x, this.props.to.y)
    }

    render() {
        return null
    }
}

export class Line extends React.Component {
    constuctor(props) {
        super(props)
    }

    componentDidMount() {
        let ctx = this.context.graphics
        ctx.moveTo(this.props.from.x, this.props.from.y)
        ctx.lineTo(this.props.to.x, this.props.to.y)
    }

    render() {
        return null
    }
}

export class Circle extends React.Component {
    constuctor(props) {
        super(props)
    }

    componentDidMount() {
        let ctx = this.context.graphics
        ctx.moveTo(this.props.from.x, this.props.from.y)
        ctx.lineTo(this.props.to.x, this.props.to.y)
    }

    render() {
        return null
    }
