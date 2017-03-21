import React from 'react'
import CoordinateTransforms from '../lib/coordinateTransforms'

/**
 * Draw a bot control grid
 */
export default class ControlGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            paths: []
        }

        this.clickHandler = this.clickHandler.bind(this)

        this.coordService = new CoordinateTransforms({ x: this.props.size / 2, y: this.props.size / 2 })
        this.halfGap = 0.070

        this.state.paths.push(this.arcPath(1.375, 1.625, 90, 150, { fillStyle: 'green' }, 'straight'))
        this.state.paths.push(this.arcPath(0.750, 1.375, 90, 150, { fillStyle: 'lightgreen' }, 'left'))
        this.state.paths.push(this.arcPath(1.625, 0.250, 90, 150, { fillStyle: 'lightgreen' }, 'right'))

        this.state.paths.push(this.arcPath(0.625, 0.750, 90, 150, { fillStyle: 'blue' }, 'blue'))
        this.state.paths.push(this.arcPath(0.500, 0.625, 90, 150, { fillStyle: 'green' }, 'green'))
        this.state.paths.push(this.arcPath(0.375, 0.500, 90, 150, { fillStyle: 'orange' }, 'yellow'))
        this.state.paths.push(this.arcPath(0.250, 0.375, 90, 150, { fillStyle: 'red' }, 'red'))

        this.state.paths.push(this.semiPath(0.875, 0.125, 80, { fillStyle: 'lightblue' }, 'speed'))
        this.state.paths.push(this.semiPath(0.125, 0.875, 80, { fillStyle: 'blue' }, 'stop'))
    }

    clickHandler(e) {
        if (this.props.onClick) {
            let ctx = document.getElementById(this.props.id).getContext('2d')
            let point = { x: e.clientX, y: e.clientY }
            this.state.paths.map(path => {
                if (ctx.isPointInPath(path, point.x, point.y)) {
                    point = this.coordService.canvasToCartesian(point)
                    point = this.coordService.cartesianToPolar(point)
                    this.props.onClick({ coordinates: point, action: path.action })
                }
            })
        }
    }

    drawGrid() {
        let ctx = document.getElementById(this.props.id).getContext('2d')
        this.state.paths.forEach(path => {
            Object.assign(ctx, path.styles)
            if (path.styles.fillStyle) ctx.fill(path)
            if (path.styles.strokeStyle) ctx.stroke(path)
        })
    }

    arcPath(start, end, innerRadius, outerRadius, styles = { strokeStyle: 'black' }, action) {
        let path = new Path2D()
        path.styles = styles
        path.action = action
        let point = { r: outerRadius, theta: start * Math.PI + this.halfGap }
        path.arc(this.coordService.offset.x, this.coordService.offset.y, outerRadius, point.theta, end * Math.PI - this.halfGap)
        path.arc(this.coordService.offset.x, this.coordService.offset.y, innerRadius, end * Math.PI - this.halfGap, point.theta, true)

        point = this.coordService.canvaspolarToPolar(point)
        point = this.coordService.polarToCartesian(point)
        point = this.coordService.cartesianToCanvas(point)
        path.lineTo(point.x, point.y)

        return path
    }

    semiPath(start, end, radius, styles, action) {
        let path = new Path2D()
        path.styles = styles
        path.action = action
        let point = { r: radius, theta: start * Math.PI + this.halfGap }
        path.arc(this.coordService.offset.x, this.coordService.offset.y, radius, point.theta, end * Math.PI - this.halfGap)

        point = this.coordService.canvaspolarToPolar(point)
        point = this.coordService.polarToCartesian(point)
        point = this.coordService.cartesianToCanvas(point)
        path.lineTo(point.x, point.y)

        return path
    }

    componentDidMount() {
        this.drawGrid(this.props.size);
    }

    render() {
        return (
            <div style={{ position: 'absolute' }}>
                <canvas id={this.props.id}
                    width={this.props.size}
                    height={this.props.size}
                    onClick={this.clickHandler}>
                </canvas>
            </div >
        );
    }
}