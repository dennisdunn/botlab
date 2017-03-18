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
        this.clickHandler = this.clickHandler.bind(this)
        this.clickHandler2 = this.clickHandler2.bind(this)
    }

    clickHandler(e) {
        console.log('path one')
    }

    clickHandler2(e) {
        console.log('path two')
    }

    render() {
        return (
            <MuiThemeProvider>
                <div style={{ position: 'relative' }}>
                    <Surface id="controlsurface" width="310" height="310" >
                        <Path fill="lightblue" stroke="blue" onClick={this.clickHandler}>
                            <Circle center={{ x: 100, y: 155 }} radius={100}></Circle>
                        </Path>
                        <Path fill="lightgreen" stroke="green" onClick={this.clickHandler2}>
                            <Circle center={{ x: 200, y: 155 }} radius={100}></Circle>
                        </Path>
                    </Surface>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(state => state)(AppContainer)
