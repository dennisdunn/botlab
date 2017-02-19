import React from 'react';
import ReactDOM from 'react-dom';
import Style from './style.css'

class Joystick extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        (
            <div id={this.props.id || "joystick1"}>
                <canvas></canvas>
            </div>
        )
    };
};