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
        const llower = 1.25 * Math.PI
        const lupper = 0.625 * Math.PI
        const rlower = 1.75 * Math.PI
        const rupper = 0.375 * Math.PI
        return (
            <MuiThemeProvider>
                <div style={{ position: 'relative' }}>
                    <PolarGrid id="polargrid" stroke="green" fill="lightgreen" size="310" radius="150" lines="10"></PolarGrid>
                    <Surface id="controlsurface" width="310" height="310">
                        <Path strokeStyle='blue' fillStyle='rgba(128, 128, 128, 0.5)' onClick={this.onLeftclick}>
                            <Arc origin={{ x: 0, y: 0 }} radius={150} start={llower} end={lupper} />
                            <Arc origin={{ x: 0, y: 0 }} radius={100} start={lupper} end={llower} ccw='false' />
                            <Line to={{ r: 150, theta: llower }} />
                        </Path>
                        <Path strokeStyle='blue' fillStyle='rgba(128, 128, 128, 0.5)' onClick={this.onRightclick}>
                            <Arc origin={{ x: 0, y: 0 }} radius={150} start={rlower} end={rupper} ccw='false' />
                            <Arc origin={{ x: 0, y: 0 }} radius={100} start={rupper} end={rlower} />
                            <Line to={{ r: 150, theta: rlower }} />
                        </Path>
                        <Path strokeStyle='blue' fillStyle='rgba(128, 128, 128, 0.5)' onClick={this.onRightclick}>
                            <Arc origin={{ x: 0, y: 0 }} radius={150} start={lupper} end={rupper} ccw='true' />
                            <Arc origin={{ x: 0, y: 0 }} radius={100} start={rupper} end={lupper} ccw='true' />
                            <Line to={{ r: 150, theta: lupper }} />
                        </Path>

                    </Surface>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(state => state)(AppContainer)
