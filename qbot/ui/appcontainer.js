import React from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ConsoleComponent from './consolecomponent'

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
                <ConsoleComponent />
            </MuiThemeProvider>
        );
    }
}

export default connect(state => state)(AppContainer);
