import React from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ControlGrid from './components/controlGrid'

const url = 'http://'

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
                <div style={{ position: 'relative' }}>
                    <ControlGrid id='controlGrid' size='310' onClick={console.log}></ControlGrid>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(state => state)(AppContainer)
