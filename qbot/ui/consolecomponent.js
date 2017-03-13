import React from 'react'
import AppBar from 'material-ui/AppBar';
import Slider from 'material-ui/Slider';

export default class ConsoleComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <AppBar title="Qbot" />
                <Slider
                    min={-1}
                    max={1}
                    defaultValue={0}
                    onChange={this.handleFirstSlider}
                />
                <Slider
                    style={{ height: 200 }}
                    axis="y"
                />
            </div>
        )
    }
}