import React from 'react';
import PolarGrid from './polarGrid';
import ControlSurface from './controlSurface';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import request from 'superagent';

const url = "http://"

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(e) {

    }

    render() {
        let deadZone = Math.PI * 0.25
        return (
            <MuiThemeProvider>
                <div>
                    <PolarGrid id="polargrid" size="310" radius="150" lines="10"></PolarGrid>
                    <ControlSurface id="controlsurface" size="310" radius="150" zoneRadius="200" zoneWidth="60" zoneTheta={deadZone}></ControlSurface>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(state => state)(AppContainer);
