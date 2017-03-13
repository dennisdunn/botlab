import React from 'react'
import Styles from './joystick.css'
import JoystickBase from './joystickBase'
import ControlSurface from './controlsurface'

export default class JoystickContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let deadZone= Math.PI * 0.25
        return (
            <div className={Styles.joystick}>
                <JoystickBase id="polargrid" width={this.props.width} height={this.props.height}></JoystickBase>
                <ControlSurface id="controlsurface" width={this.props.width} height={this.props.height} zoneRadius="200" zoneWidth="60" zoneTheta={deadZone}></ControlSurface>
            </div>
        );
    }
}