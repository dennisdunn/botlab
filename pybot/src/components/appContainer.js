import React from 'react'
import { connect } from 'react-redux'
import NavPanel from './nav'
import PowerPanel from './power'

class AppContainer extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <NavPanel></NavPanel>
            <PowerPanel></PowerPanel>
        </div>
    }
}
export default connect(state => state)(AppContainer)
