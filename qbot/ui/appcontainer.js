<<<<<<< HEAD
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Buttonbar from './buttonbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import JoystickContainer from './joystick';
import request from 'superagent';


const rfactor = 3;
const url = "http://"
=======
import React from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ConsoleComponent from './consolecomponent'
>>>>>>> 6c4811c907699516e8b6c273b3f1d5b45baaf63b

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
<<<<<<< HEAD
                <div>
                    <Buttonbar onClick={this.clickHandler}></Buttonbar>
                    <JoystickContainer width='400' height='400'></JoystickContainer>
                </div>
=======
                <ConsoleComponent />
>>>>>>> 6c4811c907699516e8b6c273b3f1d5b45baaf63b
            </MuiThemeProvider>
        );
    }
}

export default connect(state => state)(AppContainer);
