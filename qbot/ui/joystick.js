import React from 'react'
import PolarGrid from './polarGrid'
import ControlSurface from './controlsurface'

export default class Joystick extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let deadZone= Math.PI * 0.25
        return (
            <div className="joystick">
                <PolarGrid id="polargrid" width="310" height="310" radius="150" lines="10"></PolarGrid>
                <ControlSurface id="controlsurface" width={this.props.width} height={this.props.height} zoneRadius="200" zoneWidth="60" zoneTheta={deadZone}></ControlSurface>
            </div>
        );
    }
}