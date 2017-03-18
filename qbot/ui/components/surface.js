import React from 'react'

/**
 * A control surface reports on mouse actions in
 * pre-defined "hot zones." Hot zones are closed
 * paths on the control surface.
 */
export default class Surface extends React.Component {
    constructor(props) {
        super(props)
        this.state = { graphicsContext: null }
        this.refCallback = this.refCallback.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
        this.mountHandler = this.mountHandler.bind(this)

        this.clickHandlers = []
    }

    mountHandler(component) {
        this.clickHandlers.push(component.hitHandler)
    }

    refCallback(el) {
        const context = document.getElementById(el.id).getContext('2d')
        this.setState({ graphicsContext: context })
    }

    clickHandler(e) {
        this.clickHandlers.map(handler => handler(e))
    }

    render() {
        const graphicsProps = { graphicsContext: this.state.graphicsContext, onMount:this.mountHandler }
        const children = React.Children.map(this.props.children, child => React.cloneElement(child, graphicsProps))
        return (
            <div>
                <canvas id={this.props.id}
                    width={this.props.width || 300}
                    height={this.props.height || 150}
                    onMouseDown={this.mousedownHandler}
                    onMouseUp={this.mouseupHandler}
                    onMouseMove={this.mousemoveHandler}
                    onClick={this.clickHandler}
                    ref={this.refCallback}>
                </canvas>
                {children}
            </div>
        );
    }
}
