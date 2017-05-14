import React from 'react'
import Coord from '../lib/coordService'
import MappedHandler from './mappedHandlerComponent'

export default class Wedge extends MappedHandler{
    constructor(props) {
        super(props)
    }

    render() {
        let ul = Coord.polarToCanvas(this.props.outerLeft)
        let ur = Coord.polarToCanvas({ r: this.props.outerLeft.r, theta: this.props.innerRight.theta })
        let lr = Coord.polarToCanvas(this.props.innerRight)
        let ll = Coord.polarToCanvas({ r: this.props.innerRight.r, theta: this.props.outerLeft.theta })
     
        let pathData = `M ${ul.x} ${ul.y} A ${this.props.outerLeft.r} ${this.props.outerLeft.r} 0 0 1 ${ur.x} ${ur.y} L ${lr.x},${lr.y} A ${this.props.innerRight.r} ${this.props.innerRight.r} 0 0 0 ${ll.x} ${ll.y} Z`

        return <path {...this.handlers} d={pathData} {...this.props.styles}></path>
    }
}   