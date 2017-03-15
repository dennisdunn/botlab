import React from 'react'

/**
 * A control surface reports on mouse actions in
 * pre-defined "hot zones." Hot zones are closed
 * paths on the control surface.
 */
export class Surface extends React.Component {
    constructor(props) {
        super(props)
        console.log('surface constructor')

        this.mousedownHandler = this.mousedownHandler.bind(this)
        this.mouseupHandler = this.mouseupHandler.bind(this)
        this.mousemoveHandler = this.mousemoveHandler.bind(this)

        this.clickHandler = this.clickHandler.bind(this)

        this.refCallback = this.refCallback.bind(this)

        this.state = { graphicsContext: null }
    }

    clickHandler(e) {
        if (this.isHitInZone(e)) {
            e.preventDefault()
            this.props.onClick({ x: e.clientX, y: e.clientY })
        }
    }

    refCallback(el) {
        console.log('surface did ref callback')
        let context = document.getElementById(el.id).getContext('2d')
        console.log(context)
        this.setState({ graphicsContext: context })
    }

    mousedownHandler(e) {
        if (this.isHitInZone(e)) {
            e.preventDefault()
            this.tracking = true
        }
    }

    mouseupHandler(e) {
        if (this.tracking) {
            e.preventDefault()
            this.tracking = false
        }
    }

    mousemoveHandler(e) {
        if (this.tracking && this.isHitInZone(e)) {
            e.preventDefault()
            this.props.onMouse({ x: e.clientX, y: e.clientY })
        }
    }

    isHitInZone(e) {
        return this.state.graphicsContext.isPointInPath(e.clientX, e.clientY)
    }

    strokeTheGraphics() {
        console.log('surface did strokeTheGraphics')
        if (this.state.graphicsContext) {
        console.log('surface render strokeTheGraphics')
            this.state.graphicsContext.moveTo(0, 310)
            this.state.graphicsContext.lineTo(310, 0)
            if (this.props.fill) {
                this.state.graphicsContext.fillStyle = this.props.fill
                this.state.graphicsContext.fill()
            }
            if (this.props.stroke) {
                this.state.graphicsContext.strokeStyle = this.props.stroke
                this.state.graphicsContext.stroke()
            }
        }
    }

    render() {
        console.log('surface did render')
        const children = React.cloneElement(this.props.children, { graphics: this.state.graphicsContext })
      this.strokeTheGraphics()
        return (
            <div>
                <canvas id={this.props.id}
                    width={this.props.width || 300}
                    height={this.props.height || 150}
                    onMouseDown={this.mousedownHandler}
                    onMouseUp={this.mouseupHandler}
                    onMouseMove={this.mousemoveHandler}
                    onClick={this.clickHandler}
                    ref={this.refCallback}>
                </canvas>
                {children}
            </div>
        );
    }
}

export class Arc extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.context.graphics.arcTo(this.props.from.x, this.props.from.y, this.props.to.x, this.props.to.y, this.props.radius)
        this.context.graphics.moveTo(this.props.from.x, this.props.from.y)
        this.context.graphics.lineTo(this.props.to.x, this.props.to.y)
    }

    render() {
        return null
    }
}

export class Line extends React.Component {
    constructor(props) {
        super(props)
        console.log('line constructor')
    }

    componentDidMount() {
        console.log('line did mount')
        if (this.props.graphics) {
            console.log('line update graphics context')
            this.props.graphics.moveTo(this.props.from.x, this.props.from.y)
            this.props.graphics.lineTo(this.props.to.x, this.props.to.y)
        }
    }

    render() {
        console.log('line did render')
        if (this.props.graphics) {
            console.log('line render to graphics context')
            this.props.graphics.moveTo(this.props.from.x, this.props.from.y)
            this.props.graphics.lineTo(this.props.to.x, this.props.to.y)
        }
        return null
    }
}

export class Circle extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.graphics.arc(this.props.from.x, this.props.from.y, this.props.radius, 0, 2 * MathPI)
    }

    render() {
        return null
    }
}