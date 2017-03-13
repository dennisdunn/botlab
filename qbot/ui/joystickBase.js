import React from 'react'
import Styles from './joystick.css'

export default class JoystickBase extends React.Component {
    constructor(props) {
        super(props);
    }

    drawPolarGrid() {
        let ctx = document.getElementById(this.props.id).getContext('2d');
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

    componentDidMount() {
        this.drawPolarGrid();
    }

    render() {
        return (
            <div className={Styles.joystick.base}>
                <canvas id={this.props.id}
                    width={this.props.width}
                    height={this.props.height}>
                </canvas>
            </div>
        );
    }
}