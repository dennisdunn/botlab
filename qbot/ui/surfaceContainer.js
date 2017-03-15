import React from 'react';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Surface, Arc, Line } from './components/controlSurface'

const url = "http://"

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let deadZone = Math.PI * 0.125
        return (
            <MuiThemeProvider>
                <div style={{ position: 'relative' }}>
                    <Surface id="controlsurface" stroke="black" width="310" height="310" >
                        <Line from={{x:0, y:0}} to={{x:310, y:310}}></Line>
                    </Surface>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(state => state)(AppContainer);
