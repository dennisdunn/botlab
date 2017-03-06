import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Buttonbar from './buttonbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Joystick from './joystick';
import request from 'superagent';


const rfactor = 3;
const url = "http://"

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.positionHandler = this.positionHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }

    positionHandler(position) {
        request.post(url + 'motor/' + position.r * rfactor)
            .set('Accept', 'application/json')
            .end((err, resp) => {
                console.log(resp);
            });
    }

    clickHandler(e) {
        console.log(e);
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Buttonbar onClick={this.clickHandler}></Buttonbar>
                    <Joystick width='400' height='400' onPosition={this.positionHandler}></Joystick>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(state => state)(AppContainer);
