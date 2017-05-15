import React from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Surface from './components/surface'
import Shape from './components/shape'
import Arc from './components/arc'
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
                    <Surface id='graphics' size='310' onClick={this.clickHandler}>
                        <Shape styles={{ fillStyle: 'blue' }}>
                            <Arc start={{ r: 100, theta: 0 }} end={{ r: 100, theta: Math.PI }}></Arc>
                        </Shape>
                    </Surface>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default connect(state => state)(AppContainer)
