import React from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ControlGrid from './controlGrid'
import PolarGrid from './polarGrid'

const url = 'http://'

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
                <div style={{ position: 'relative' }}>
                    <PolarGrid id='polargrid' stroke='green' fill='lightgreen' size='310' radius='150' lines='10'></PolarGrid>
                    <ControlGrid id='controlGrid' size='310'></ControlGrid>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(state => state)(AppContainer)
