import React from 'react'
import Styles from './app.css'
import CoordinateTransforms from './coordinateTransforms'

/**
 * A control surface reports on mouse actions in
 * pre-defined "hot zones." Hot zones are closed
 * paths on the control surface.
 */
export default class controlSurface extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tracking: false
        }

        this.mousedownHandler = this.mousedownHandler.bind(this)
        this.mouseupHandler = this.mouseupHandler.bind(this)
        this.mousemoveHandler = this.mousemoveHandler.bind(this)

        this.origin = {
            x: this.props.size / 2,
            y: this.props.size / 2
        }

        this.mouseMoveTimerId = null

        this.zones = []
        this.xy = new CoordinateTransforms(this.origin)
        this.createZones(this.props.radius, this.props.zoneWidth, this.props.zoneTheta)
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
            let pt = this.getPolarCoordinates(e)
            if (this.mouseMoveTimerId) clearTimeout(this.mouseMoveTimerId)
            this.mouseMoveTimerId = setTimeout(this.props.onChanged, 250, pt);
        }
    }

    isHitInZone(e) {
        let ctx = document.getElementById(this.props.id).getContext('2d')
        return this.zones.reduce((v, z) => v || ctx.isPointInPath(z, e.clientX, e.clientY), false)
    }

    getPolarCoordinates(e) {
        let domPoint = this.xy.eventToDom(e)
        let canvasPoint = this.xy.domToCartesian(domPoint)
        return this.xy.cartesianToPolar(canvasPoint)
    }

    createZones(radius, deltaRadius, theta) {
        let rDelta = radius - deltaRadius
        let plusTheta = 1.5 * Math.PI - 0.5 * theta
        let minusTheta = 1.5 * Math.PI + 0.5 * theta
        this.zones.push(this.createZone([{
            r: radius,
            theta: plusTheta
        },
        {
            r: radius,
            theta: Math.PI
        },
        {
            r: rDelta,
            theta: Math.PI
        },
        {
            r: rDelta,
            theta: plusTheta
        }]))
        this.zones.push(this.createZone([{
            r: radius,
            theta: 0
        },
        {
            r: radius,
            theta: minusTheta
        },
        {
            r: rDelta,
            theta: minusTheta
        },
        {
            r: rDelta,
            theta: 0
        }]))
    }

    createZone(points) {
        let path = new Path2D()
        path.arc(this.origin.x, this.origin.y, points[0].r, points[0].theta, points[1].theta, true)
        path.arc(this.origin.x, this.origin.y, points[2].r, points[2].theta, points[3].theta)
        path.closePath()

        return path
    }

    drawZones() {
        let ctx = document.getElementById(this.props.id).getContext('2d')
        ctx.fillStyle = this.props.fill || "white"
        ctx.strokeStyle = this.props.stroke || "black"
        for (let i = 0; i < this.zones.length; i++) {
            ctx.fill(this.zones[i])
            ctx.stroke(this.zones[i])
        }
    }

    componentDidMount() {
        this.drawZones()
    }

    render() {
        return (
            <div className={Styles.controlSurface_container}>
                <canvas id={this.props.id}
                    width={this.props.size}
                    height={this.props.size}
                    onMouseDown={this.mousedownHandler}
                    onMouseUp={this.mouseupHandler}
                    onMouseMove={this.mousemoveHandler}>
                </canvas>
            </div>
        );
    }
}