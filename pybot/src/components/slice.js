import React from 'react'
import Coord from '../lib/coordService'

/**
 * A slice of the pie.
 */
export default class Slice extends React.Component {
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
        let center = Coord.polarToCanvas({r:0, theta:0})
        let pathData = `M ${start.x} ${start.y} A ${this.props.start.r} ${this.props.start.r} 0 0 1 ${snd.x} ${end.y} L ${center.x},${center.y} Z`

        return <path {...handlers} d={pathData} {...this.props.styles}></path>
    }
}