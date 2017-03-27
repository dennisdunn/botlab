import React from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ControlGrid from './components/controlGrid'
import ActionFactory from './lib/actionCreators'
import * as Actions from './lib/actions'

class AppContainer extends React.Component {

    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler(eventArgs) {
        let { dispatch } = this.props
        let action = ActionFactory[eventArgs.action](eventArgs)
        dispatch(action)
    }

    render() {
        return (
            <MuiThemeProvider>
                <div style={{ position: 'relative' }}>
                    <ControlGrid id='controlGrid' size='310' onClick={this.clickHandler}></ControlGrid>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default connect(state => state)(AppContainer)
