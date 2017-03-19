import React from 'react'

export default class Path extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            path: new Path2D()
        }
    }

    componentDidMount() {
        if (this.props.register) this.props.register(this)
    }

    render() {
        const childProps = {
            path: this.state.path,
            origin: this.props.origin
        }
        const children = React.Children.map(this.props.children, child => React.cloneElement(child, childProps))

        return <div>{children}</div>
    }
}

