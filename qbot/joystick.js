import React from 'react';
import Styles from './joystick.css';

export default class Joystick extends React.Component {
    constructor(props) {
        super(props);

        this.mousedownHandler = this.mousedownHandler.bind(this);
        this.mouseupHandler = this.mouseupHandler.bind(this);
        this.mousemoveHandler = this.mousemoveHandler.bind(this);

        this.state = {
            tracking: false
        };
    }

    mousedownHandler(e) {
        e.preventDefault();
        this.setState({ tracking: true });
        let canvasPoint = this.getCanvasCoordinates(e);
        this.drawTrace(canvasPoint);
        this.dispatch(canvasPoint)
    }

    mouseupHandler(e) {
        e.preventDefault();
        this.setState({ tracking: false });
        let canvasPoint = {
            x: this.props.width / 2,
            y: this.props.height / 2
        }
        this.drawTrace(canvasPoint);
        this.dispatch(canvasPoint);
    }

    mousemoveHandler(e) {
        if (this.state.tracking) {
            e.preventDefault();
            let canvasPoint = this.getCanvasCoordinates(e);
            this.drawTrace(canvasPoint);
            this.dispatch(canvasPoint);
        }
    }

    dispatch(canvasPoint) {
        let cartesian = this.canvasToCartesianCoordinates(canvasPoint);
        let polar = this.cartesianToPolarCoordinates(cartesian);
        this.props.onPosition(polar);
    }

    drawTrace(pos) {
        let ctx = document.getElementById(Styles.overlay).getContext('2d');
        ctx.beginPath();

        ctx.clearRect(0, 0, this.props.width, this.props.height);

        let offset = {
            x: this.props.width / 2,
            y: this.props.height / 2
        }
        ctx.moveTo(offset.x, offset.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    getCanvasCoordinates(evt) {
        var rect = document.getElementById(Styles.overlay).getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    canvasToCartesianCoordinates(point) {
        let offset = {
            x: this.props.width / 2,
            y: this.props.height / 2
        }
        return {
            x: point.x - offset.x,
            y: offset.y - point.y
        }
    }

    cartesianToPolarCoordinates(point) {
        let theta = Math.atan2(point.y, point.x);
        theta = theta < 0 ? 2 * Math.PI + theta : theta;
        return {
            r: Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2)),
            theta: theta
        }
    }

    componentDidMount() {
        let ctx = document.getElementById(Styles.background).getContext('2d');
        ctx.beginPath();

        let midAxis = {
            x: this.props.width / 2,
            y: this.props.height / 2
        }
        ctx.moveTo(0, 0);
        ctx.lineTo(this.props.width, this.props.height);
        ctx.moveTo(0, this.props.height);
        ctx.lineTo(this.props.width, 0)
        ctx.moveTo(midAxis.x, 0);
        ctx.lineTo(midAxis.x, this.props.height);
        ctx.moveTo(0, midAxis.y);
        ctx.lineTo(this.props.width, midAxis);

        let delta = midAxis.y / 10;
        for (let r = delta; r <= midAxis.y; r += delta) {
            ctx.arc(midAxis.x, midAxis.y, r, 0, 2 * Math.PI);
        }

        ctx.strokeStyle = 'green';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    render() {
        return (
            <div className={Styles.joystick}>
                <canvas id={Styles.background}
                    width={this.props.width}
                    height={this.props.height}>
                </canvas>
                <canvas id={Styles.overlay}
                    width={this.props.width}
                    height={this.props.height}
                    onMouseDown={this.mousedownHandler}
                    onMouseUp={this.mouseupHandler}
                    onMouseMove={this.mousemoveHandler}>
                </canvas>
            </div>
        );
    }
}