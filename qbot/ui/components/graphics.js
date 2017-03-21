import React from 'react'

export default class GraphicsComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (this.props.path) this.addToPath()
    }

    render() {
        return null
    }
}