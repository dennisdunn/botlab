import React from 'react'
import CoordinateTransforms from '../lib/coordinateTransforms'

export default class Surface extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            paths: [],
            graphicsContext: null,
            offset: { x: this.props.width / 2, y: this.props.height / 2 }
        }
        this.state.service = new CoordinateTransforms(this.state.offset)

        this.register = this.register.bind(this)
        this.refCallback = this.refCallback.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    componentDidUpdate() {
        this.state.paths.forEach(path => {console.log(path)
            Object.assign(this.state.graphicsContext, path.styles)
            if (path.styles.strokeStyle) this.state.graphicsContext.stroke(path.state.path)
            if (path.styles.fillStyle) this.state.graphicsContext.fill(path.state.path)
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
                let point = this.state.service.canvasToCartesian({ x: e.clientX, y: e.clientY })
                point = this.state.service.cartesianToPolar(point)
                path.props.onClick({ coordinates: point, action: path.props.action })
            }
        })
    }

    render() {
        const graphicsProps = {
            register: this.register,
            service: this.state.service
        }
        const children = React.Children.map(this.props.children, child => React.cloneElement(child, graphicsProps))
        return (
            <div style={{ position: 'absolute' }}>
                <canvas id={this.props.id}
                    width={this.props.width}
                    height={this.props.height}
                    onClick={this.clickHandler}
                    ref={this.refCallback}>
                </canvas>
                {children}
            </div>
        );
    }
}
