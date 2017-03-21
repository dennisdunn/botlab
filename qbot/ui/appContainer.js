import React from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ControlGrid from './components/controlGrid'
import Surface from './components/surface'
import Path from './components/path'
import Arc from './components/arc'

const url = 'http://'

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MuiThemeProvider>
                <div style={{ position: 'relative' }}>
                    <Surface id='controlGrid' size='310' onClick={console.log}>
                        <Path styles={{strokeStyle:'black'}} >
                            <Arc
                                upperLeft={{ r: 150, theta: Math.PI }}
                                lowerRight={{ r: 100, theta: 0.5 * Math.PI }}
                                payload={{ action: 'speed' }}>
                            </Arc>
                        </Path>
                    </Surface>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(state => state)(AppContainer)
