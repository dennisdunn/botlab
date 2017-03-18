import React from 'react'

/**
 * A control surface reports on mouse actions in
 * pre-defined "hot zones." Hot zones are closed
 * paths on the control surface.
 */
export default class Surface extends React.Component {
    constructor(props) {
        super(props)

        this.state = { graphicsContext: null }

        this.mousedownHandler = this.mousedownHandler.bind(this)
        this.mouseupHandler = this.mouseupHandler.bind(this)
        this.mousemoveHandler = this.mousemoveHandler.bind(this)

        this.clickHandler = this.clickHandler.bind(this)

        this.refCallback = this.refCallback.bind(this)
        this.draw = this.draw.bind(this)
    }

    refCallback(el) {
        let context = document.getElementById(el.id).getContext('2d')
        this.setState({ graphicsContext: context })
    }

    clickHandler(e) {
        if (this.props.onClick && this.isHitInZone(e)) {
            e.preventDefault()
            this.props.onClick({ x: e.clientX, y: e.clientY })
        }
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
        if (this.props.onMouse && this.tracking && this.isHitInZone(e)) {
            e.preventDefault()
            this.props.onMouse({ x: e.clientX, y: e.clientY })
        }
    }

    isHitInZone(e) {
        return this.state.graphicsContext.isPointInPath(e.clientX, e.clientY)
    }

    draw() {
        let element = document.getElementById(this.props.id)
        if (element == null) return

        let context = element.getContext('2d')
        if (this.props.fill) {
            context.fillStyle = this.props.fill
            context.fill()
        }
        if (this.props.stroke) {
            context.strokeStyle = this.props.stroke
            context.stroke()
        }
    }

    render() {
        const children = React.Children.map(this.props.children, child => React.cloneElement(child, { ctx: this.state.graphicsContext, onUpdate: this.draw }))

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
