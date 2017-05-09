import React from 'react'
import Coord from 'libcoord'

export default class Wedge extends React.Component {
    constructor(props) {
        super(props)
        this.coord = new Coord(props.origin)
    }

    render() {
        let ul = this.coord.polarToCanvas(this.props.upperLeft)
        let ur = this.coord.polarToCanvas({ r: this.props.upperLeft.r, theta: this.props.lowerRight.theta })
        let lr = this.coord.polarToCanvas(this.props.lowerRight)
        let ll = this.coord.polarToCanvas({ r: this.props.lowerRight.r, theta: this.props.upperLeft.theta })
        let pathData = `M ${ul.x},${ul.y} A ${ur.x},${ur.y} 0 0,1 ${this.props.upperLeft.r},${this.props.upperLeft.r} L ${lr.x},${lr.y} A ${ll.x},${ll.y} 0 0,0 ${this.props.lowerRight.r},${this.props.lowerRight.r} Z`
       console.log(pathData)
        return <path onClick={this.props.onClick} d={pathData}></path>
    }
}