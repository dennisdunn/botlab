/**
 * A semi-circle
 */
import React from 'react'
import Coord from '../lib/coordService'
import MappedHandler from './mappedHandlerComponent'

export default class Semi extends MappedHandler {
    constructor(props) {
        super(props)
    }

    render() {
        let start = Coord.polarToCanvas(this.props.start)
        let end = Coord.polarToCanvas(this.props.end)
        let isFat = this.props.fat ? 1 : 0;
        let pathData = `M ${start.x} ${start.y} A ${this.props.start.r} ${this.props.start.r} 0 ${isFat} 1 ${end.x} ${end.y} Z`

        return <path {...this.handlers} d={pathData} {...this.props.styles}></path>
    }
}