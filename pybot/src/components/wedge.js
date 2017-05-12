import React from 'react'
import Coord from 'libcoord'

export default class Wedge extends React.Component {
    constructor(props) {
        super(props)
        this.coord = new Coord(props.origin)
    }

    render() {
        let ul = this.coord.polarToCanvas(this.props.outerLeft)
        let ur = this.coord.polarToCanvas({ r: this.props.outerLeft.r, theta: this.props.innerRight.theta })
        let lr = this.coord.polarToCanvas(this.props.innerRight)
        let ll = this.coord.polarToCanvas({ r: this.props.innerRight.r, theta: this.props.outerLeft.theta })
     
        let pathData = `M ${ul.x} ${ul.y} A ${this.props.outerLeft.r} ${this.props.outerLeft.r} 0 0 1 ${ur.x} ${ur.y} L ${lr.x},${lr.y} A ${this.props.innerRight.r} ${this.props.innerRight.r} 0 0 0 ${ll.x} ${ll.y} Z`

        return <path onClick={this.props.onClick} d={pathData} fill={this.props.color}></path>
    }
}