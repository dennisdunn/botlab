import React from 'react'

/**
 * An HTML5 arc.
 * 
 * Props:
 * start={r, theta}
 * stop={r, theta}
 * service= coordinate transform service, injected by the parent.
 * path= path2d injected by the parent.
 * 
 * Radius for the arc comes from the start prop.
 * The coordinates are referenced to the polar grid, not the canvas.
 */
export default class Arc extends React.Component {
    constructor(props) {
        super(props)
        this.getPath = this.getPath.bind(this)
    }

    getPath(translate) {
        const path = new Path2D()
        let o = translate.offset
        let s = translate.polarToCanvaspolar(this.props.start)
        let e = translate.polarToCanvaspolar(this.props.end)
        path.arc(o.x, o.y, s.theta, e.theta, s.r)
        return path
    }

    render() {
        return null
    }
}