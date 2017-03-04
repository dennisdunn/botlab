import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

export default class Buttonbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text="Qbot"/>
                    <FlatButton label="blue" />
                    <FlatButton label="green" />
                    <FlatButton label="yellow" />
                    <FlatButton label="red" />
                </ToolbarGroup>
            </Toolbar>
        );
    }
}