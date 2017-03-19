import React from 'react'

/**
 * A control surface reports on mouse actions in
 * pre-defined "hot zones." Hot zones are closed
 * paths on the control surface.
 */
export default class Surface extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            paths: [],
            graphicsContext: null,
            origin: this.props.origin || { x: this.props.width / 2, y: this.props.height / 2 }
        }

        this.register = this.register.bind(this)
        this.refCallback = this.refCallback.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    componentDidUpdate() {
        this.state.paths.forEach(path => {
            Object.assign(this.state.graphicsContext, path.props)
            if (path.props.strokeStyle) this.state.graphicsContext.stroke(path.state.path)
            if (path.props.fillStyle) this.state.graphicsContext.fill(path.state.path)
        })
    }

    register(path) {
        this.state.paths.push(path)
    }

    refCallback(el) {
        const context = document.getElementById(el.id).getContext('2d')
        this.setState({ graphicsContext: context })
    }

    clickHandler(e) {
        e.persist()
        this.state.paths.forEach(path => {
            if (path.props.onClick && this.state.graphicsContext.isPointInPath(path.state.path, e.clientX, e.clientY)) {
                path.props.onClick(e)
            }
        })
    }

    render() {
        const graphicsProps = {
            origin: this.state.origin,
            register: this.register
        }
        const children = React.Children.map(this.props.children, child => React.cloneElement(child, graphicsProps))
        return (
            <div style={{ position: 'absolute' }}>
                <canvas id={this.props.id}
                    width={this.props.width || 300}
                    height={this.props.height || 150}
                    onClick={this.clickHandler}
                    ref={this.refCallback}>
                </canvas>
                {children}
            </div>
        );
    }
}
