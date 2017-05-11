import React from 'react'
import Coord from 'libcoord'

/**
 * A semi-circle
 */
export default class Semi extends React.Component {
    constructor(props) {
        super(props)
        this.coord = new Coord(props.origin)
    }

    render() {
        let start = this.coord.polarToCanvas(this.props.start)
        let end = this.coord.polarToCanvas(this.props.end)
        let isFat = this.props.fat ? 1 : 0;
        let pathData = `M ${start.x} ${start.y} A ${this.props.start.r} ${this.props.start.r} 0 ${isFat} 1 ${end.x} ${end.y} Z`

        return <path className='ripple' onClick={this.props.onClick} d={pathData} fill={this.props.color}></path>
    }
}