import React from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Arc, Line, Circle } from './components/primitives'
import Path from './components/path'
import Surface from './components/surface'

const url = "http://"

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.onLeftclick = this.onLeftclick.bind(this)
        this.onRightclick = this.onRightclick.bind(this)
    }

    onLeftclick(e) {
        console.log('left')
    }

    onRightclick(e) {
        console.log('right')
    }

    render() {
        return (
            <MuiThemeProvider>
                <div style={{ position: 'relative' }}>
                    <Surface id="controlsurface" width="310" height="310">
                        <Path stroke="blue" onClick={this.onLeftclick}>
                            <Arc origin={{ x: 155, y: 155 }} radius={150} start={Math.PI} end={1.45 * Math.PI} />
                            <Arc origin={{ x: 155, y: 155 }} radius={100} end={Math.PI} start={1.45 * Math.PI} ccw='true' />
                        </Path>
                        <Path stroke="blue" onClick={this.onRightclick}>
                            <Arc origin={{ x: 155, y: 155 }} radius={150} start={0} end={1.55 * Math.PI} ccw='true' />
                            <Arc origin={{ x: 155, y: 155 }} radius={100} end={0} start={1.55 * Math.PI} />
                        </Path>
                    </Surface>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(state => state)(AppContainer)
