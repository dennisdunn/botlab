import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Buttonbar from './buttonbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Joystick from './joystick';

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.onPositionChanged = this.onPositionChanged.bind(this);
    }

    onPositionChanged(position) {
        let { dispatch } = this.props;
        dispatch({ type: 'SET_POWER', payload: position });
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Buttonbar></Buttonbar>
                    <Joystick width='400' height='400' positionChangeHandler={this.onPositionChanged}></Joystick>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(state => ({ 'position': state.position }))(AppContainer);
