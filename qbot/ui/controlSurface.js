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

        this.zones = []
        this.xy = new CoordinateTransforms(this.origin)
        this.createZones(this.props.radius, this.props.zoneWidth, this.props.zoneTheta)
    }

    mousedownHandler(e) {
        e.preventDefault()
        this.setState({ tracking: true })
        let canvasPoint = this.xy.eventToDom(e)
        this.drawTrace(canvasPoint)
        this.dispatch(canvasPoint)
    }

    mouseupHandler(e) {
        e.preventDefault()
        this.setState({ tracking: false })
        let canvasPoint = {
            x: this.props.width / 2,
            y: this.props.height / 2
        }
        this.drawTrace(canvasPoint)
        this.dispatch(canvasPoint)
    }

    mousemoveHandler(e) {
        if (this.state.tracking) {
            e.preventDefault()
            let domPoint = this.xy.eventToDom(e)
        }
    }

    dispatch(domPoint) {
        let cartesian = this.xy.domToCartesian(domPoint)
        let polar = this.xy.cartesianToPolar(cartesian)
        this.props.onPositionChanged(polar)
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