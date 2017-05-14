import React from 'react'
import Coord from '../lib/coordService'

/**
 * A semi-circle
 */
export default class Semi extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let handlers = {}
        Object.keys(this.props).forEach(key=>{
            if(key.startsWith('on')) handlers[key] = this.props[key]
        })

        let start = Coord.polarToCanvas(this.props.start)
        let end = Coord.polarToCanvas(this.props.end)
        let isFat = this.props.fat ? 1 : 0;
        let pathData = `M ${start.x} ${start.y} A ${this.props.start.r} ${this.props.start.r} 0 ${isFat} 1 ${end.x} ${end.y} Z`

        return <path {...handlers} d={pathData} {...this.props.styles}></path>
    }
}