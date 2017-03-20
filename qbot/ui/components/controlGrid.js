import React from 'react'

/**
 * Draw a bot control grid
 */
export default class ControlGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            paths: [],
            origin: { x: this.props.size / 2, y: this.props.size / 2 },
            halfGap: 0.100
        }

        this.state.paths.push(this.arcPath(1.375, 1.625, 90, 150))
        this.state.paths.push(this.arcPath(0.750, 1.375, 90, 150))
        this.state.paths.push(this.arcPath(1.625, 0.250, 90, 150))

        this.state.paths.push(this.arcPath(0.625, 0.750, 90, 150))
        this.state.paths.push(this.arcPath(0.500, 0.625, 90, 150))
        this.state.paths.push(this.arcPath(0.375, 0.500, 90, 150))
        this.state.paths.push(this.arcPath(0.250, 0.375, 90, 150))

        this.state.paths.push(this.semiPath(0.875, 0.125, 70))
        this.state.paths.push(this.semiPath(0.125, 0.875, 70))
    }

    drawGrid() {
        let ctx = document.getElementById(this.props.id).getContext('2d')
        this.state.paths.forEach(path => {
            path.options = { strokeStyle: 'black' }
            Object.assign(ctx, path.options || {})
            if (path.options.fillStyle) ctx.fill(path)
            if (path.options.strokeStyle) ctx.stroke(path)
        })
    }

    arcPath(start, end, innerRadius, outerRadius) {
        let path = new Path2D()

        path.arc(this.state.origin.x, this.state.origin.y, outerRadius, start * Math.PI + this.state.halfGap, end * Math.PI - this.state.halfGap)
        path.arc(this.state.origin.x, this.state.origin.y, innerRadius, end * Math.PI - this.state.halfGap, start * Math.PI + this.state.halfGap, true)

        return path
    }

    semiPath(start, end, radius) {
        let path = new Path2D()

        path.arc(this.state.origin.x, this.state.origin.y, radius, start * Math.PI + this.state.halfGap, end * Math.PI - this.state.halfGap)

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
                    height={this.props.size}>
                </canvas>
            </div >
        );
    }
}