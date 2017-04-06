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
    }

    componentWillMount() {
        let o = this.props.service.offset
        let s = this.props.service.polarToCanvaspolar(this.props.start)
        let e = this.props.service.polarToCanvaspolar(this.props.end)
        this.props.path.arc(o.x, o.y, s.theta, e.theta, s.r)
    }

    render() {
        return null
    }
}