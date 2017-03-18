import React from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Arc, Line, Circle, GraphicsComponent } from './components/graphicsComponents'
import Surface from './components/canvasComponent'

const url = "http://"

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler(e){
        console.log(e)
    }

    render() {
        return (
            <MuiThemeProvider>
                <div style={{ position: 'relative' }}>
                    <Surface id="controlsurface" stroke="black" width="310" height="310" onClick={this.clickHandler}>
                        <Line from={{ x: 0, y: 0 }} to={{ x: 310, y: 310 }}></Line>
                        <Line from={{ x: 310, y: 0 }} to={{ x: 0, y: 310 }}></Line>  
                        <Circle center={{ x: 155, y: 155 }} radius={100}></Circle>
                    
                    </Surface>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect(state => state)(AppContainer)
