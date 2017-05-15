/**
 * A slice of the pie.
 */
import React from 'react'
import Coord from '../lib/coordService'
import MappedHandler from './mappedHandlerComponent'

export default class Slice extends MappedHandler {
    constructor(props) {
        super(props)
    }

    render() {
        let start = Coord.polarToCanvas(this.props.start)
        let end = Coord.polarToCanvas(this.props.end)
        let center = Coord.polarToCanvas({r:0, theta:0})
        let pathData = `M ${start.x} ${start.y} A ${this.props.start.r} ${this.props.start.r} 0 0 1 ${snd.x} ${end.y} L ${center.x},${center.y} Z`

        return <path {...this.handlers} d={pathData} {...this.props.styles}></path>
    }
}