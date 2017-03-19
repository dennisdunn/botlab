import React from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Arc, Line, Circle } from './components/primitives'
import Path from './components/path'
import Surface from './components/surface'
import PolarGrid from './polarGrid'

const url = "http://"

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.onLeftclick = this.onLeftclick.bind(this)
        this.onRightclick = this.onRightclick.bind(this)
    }

    onLeftclick(e) {
        e.preventDefault()
        console.log('left')
    }

    onRightclick(e) {
        e.preventDefault()
        console.log('right')
    }

    render() {
        return (
            <MuiThemeProvider>
                <div style={{ position: 'relative' }}>
                    <PolarGrid id="polargrid" stroke="green" fill="lightgreen" size="310" radius="150" lines="10"></PolarGrid>
                    <Surface id="controlsurface" width="310" height="310">
                        <Path strokeStyle='blue' fillStyle='rgba(128, 128, 128, 0.5)' onClick={this.onLeftclick}>
                            <Arc origin={{ x: 0, y: 0 }} radius={150} end={0.5 * Math.PI} start={Math.PI} />
                            <Arc origin={{ x: 0, y: 0 }} radius={100} start={0.5 * Math.PI} end={Math.PI} ccw='false' />
                         </Path>
                    </Surface>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(state => state)(AppContainer)
