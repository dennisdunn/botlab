import React from 'react'

/**
 * A drawable shape.
 * 
 * Props: 
 * styles={fillStyle:'blue'}
 * eventArgs={action:do_something, point:{r:0, theta:0}}
 */
export default class Shape extends React.Component {
    constructor(props) {
        super(props)
        this.getPath = this.getPath.bind(this)
        console.log(this.props.children)
    }

    getPath(translate) {
        const path = new Path2D()
        React.Children.forEach(this.props.children, child => {
            let subPath = child.type.prototype.getPath(translate)
            path.addPath(subPath)
        })
        path.closePath()
        return path
    }

    render() {
        return null
    }
}