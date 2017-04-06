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
        this.state = {
            path: new Path2D()
        }
    }

    componentDidMount() {
        React.Children.map(this.props.children, child => {
            child.props.service = null
            child.props.path = this.state.path
            child.addToPath(this.state.path)
        })
    }

    render() {
        return null
    }
}