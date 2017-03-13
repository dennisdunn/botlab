import React from 'react'

/**
 * Draw a polar coordinate grid, aka a "radar Screen"
 */
export default class PolarGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    // size of the width and height of the canvas
    // radius of the outer grid line
    // spacing between grid lines
    drawGrid(size = 200, radius = 100, lines = 10) {
        let ctx = document.getElementById(this.props.id).getContext('2d')
        ctx.beginPath()
        let spacing = radius / lines
        let midAxis = {
            x: size / 2,
            y: size / 2
        }
        let offset = (Math.sqrt(Math.pow(size, 2) + Math.pow(size, 2)) - size) / 2
        offset = Math.sqrt(Math.pow(offset, 2) / 2)
        console.log(offset)
        ctx.moveTo(offset, offset)
        ctx.lineTo(size - offset, size - offset)
        ctx.moveTo(offset, size - offset)
        ctx.lineTo(size - offset, offset)
        ctx.moveTo(midAxis.x, 0)
        ctx.lineTo(midAxis.x, size)
        ctx.moveTo(0, midAxis.y)
        ctx.lineTo(size, midAxis.x)

        for (let r = spacing; r <= radius; r += spacing) {
            ctx.arc(midAxis.x, midAxis.y, r, 0, 2 * Math.PI)
        }

        ctx.strokeStyle = 'green'
        ctx.lineWidth = 1
        ctx.stroke()
    }

    componentDidMount() {
        this.drawGrid(this.props.size, this.props.radius, this.props.lines);
    }

    render() {
        return (
            <div>
                <canvas id={this.props.id}
                    width={this.props.size}
                    height={this.props.size}>
                </canvas>
            </div>
        );
    }
}