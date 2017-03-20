import React from 'react'

/**
 * Draw a bot control grid
 */
export default class ControlGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            paths: [],
            origin: { x: this.props.size / 2, y: this.props.size / 2 }
        }
        this.state.paths.push(this.arcPath(1.375, 1.625, 100, 150))
        this.state.paths.push(this.arcPath(0.750, 1.375, 100, 150))
        this.state.paths.push(this.arcPath(1.625, 0.250, 100, 150))

        this.state.paths.push(this.arcPath(0.625, 0.750, 100, 150))
        this.state.paths.push(this.arcPath(0.500, 0.625, 100, 150))
        this.state.paths.push(this.arcPath(0.375, 0.500, 100, 150))
        this.state.paths.push(this.arcPath(0.250, 0.375, 100, 150))

        this.state.paths.push(this.semiPath(0.875, 0.125, 95))
        this.state.paths.push(this.semiPath(0.125, 0.875, 95))
    }

    // size of the width and height of the canvas
    // radius of the outer grid line
    // spacing between grid lines
    drawGrid(size = 200, radius = 100, lines = 10) {
        let ctx = document.getElementById(this.props.id).getContext('2d')
        ctx.strokeStyle = 'red'
ctx.fillStyle='rgba(255,0,0,.7)'
        this.state.paths.forEach(path => {
            ctx.fill(path)
            ctx.stroke(path)
        })
    }

    arcPath(start, end, innerRadius, outerRadius) {
        let path = new Path2D()

        path.arc(this.state.origin.x, this.state.origin.y, outerRadius, start * Math.PI, end * Math.PI)
        path.arc(this.state.origin.x, this.state.origin.y, innerRadius, end * Math.PI, start * Math.PI, true)

        return path
    }

    semiPath(start, end, radius) {
        let path = new Path2D()

        path.arc(this.state.origin.x, this.state.origin.y, radius, start * Math.PI, end * Math.PI)

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