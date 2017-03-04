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
        this.setState({ tracking: true });
    }

    mouseupHandler(e) {
        this.setState({ tracking: false });
    }

    mousemoveHandler(e) {
        if (this.state.tracking) {
            e.preventDefault();
            
            let ctx = document.getElementById(Styles.overlay).getContext('2d');
            let pos = this.getMousePos(ctx.canvas,e);
            ctx.beginPath();

            ctx.clearRect(0, 0, this.props.size, this.props.size);

            let midAxis = this.props.size / 2;
            ctx.moveTo(midAxis, midAxis);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        }
    }

    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    componentDidMount() {
        let ctx = document.getElementById(Styles.background).getContext('2d');
        ctx.beginPath();

        let midAxis = this.props.size / 2;
        ctx.moveTo(0, 0);
        ctx.lineTo(this.props.size, this.props.size);
        ctx.moveTo(0, this.props.size);
        ctx.lineTo(this.props.size, 0)
        ctx.moveTo(midAxis, 0);
        ctx.lineTo(midAxis, this.props.size);
        ctx.moveTo(0, midAxis);
        ctx.lineTo(this.props.size, midAxis);

        let delta = midAxis / 10;
        for (let r = delta; r <= midAxis; r += delta) {
            ctx.arc(midAxis, midAxis, r, 0, 2 * Math.PI);
        }

        ctx.strokeStyle = 'green';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    render() {
        return (
            <div className={Styles.joystick}>
                <canvas id={Styles.background}
                    height={this.props.size}
                    width={this.props.size}>
                </canvas>
                <canvas id={Styles.overlay}
                    height={this.props.size}
                    width={this.props.size}
                    onMouseDown={this.mousedownHandler}
                    onMouseUp={this.mouseupHandler}
                    onMouseMove={this.mousemoveHandler}>
                </canvas>
            </div>
        );
    }
}