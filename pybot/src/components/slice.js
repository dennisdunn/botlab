import React from 'react'
import Coord from 'libcoord'

/**
 * A slice of the pie.
 */
export default class Slice extends React.Component {
    constructor(props) {
        super(props)
        this.coord = new Coord(props.origin)
    }

    render() {
        let start = this.coord.polarToCanvas(this.props.start)
        let end = this.coord.polarToCanvas(this.props.end)\
        let center = this.coord.polarToCanvas({r:0, theta:0})
        let pathData = `M ${start.x} ${start.y} A ${this.props.start.r} ${this.props.start.r} 0 0 1 ${snd.x} ${end.y} L ${center.x},${center.y} Z`

        return <path onClick={this.props.onClick} d={pathData} fill={this.props.color}></path>
    }
}