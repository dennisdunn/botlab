import React from 'react';
import PolarGrid from './polarGrid';
import ControlSurface from './controlSurface';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import request from 'superagent';
import Styles from './app.css'

const url = "http://"

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.onChangedHandler = this.onChangedHandler.bind(this);
    }

    onChangedHandler(polar) {
        console.log(polar)
    }

    render() {
        let deadZone = Math.PI * 0.125
        return (
            <MuiThemeProvider>
                <div className={Styles.joystick_container}>
                    <PolarGrid id="polargrid" stroke="green" fill="lightgreen" size="310" radius="150" lines="10"></PolarGrid>
                    <ControlSurface id="controlsurface" stroke="green" fill="rgba(0, 255, 0, 0.75)" size="310" radius="150" zoneRadius="200" zoneWidth="60" zoneTheta={deadZone} onChanged={this.onChangedHandler}></ControlSurface>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(state => state)(AppContainer);
