import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Buttonbar from './buttonbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Joystick from './joystick';

// this acts as a container component
class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.init = this.init.bind(this);
    }

    init(list) {
        let {dispatch} = this.props;
        dispatch({ type: 'INIT', payload: this.props.state });
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                <Buttonbar></Buttonbar>
                <Joystick width='400' height='400'></Joystick>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(state => ({ 'state': state }))(AppContainer);
