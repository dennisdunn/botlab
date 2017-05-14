/**
 * Automatically maps event handlers on props to the
 * rendered component. Use the spread operator on
 * this.handlers in the child component.
 * 
 * render(){
 *      <div {...this.handlers}></div>
 * }
 */
import React from 'react'

export default class MappedHandlerComponent extends React.Component {
    constructor(props) {
        super(props)

        this.handlers = {}
        Object.keys(this.props).forEach(key=>{
            if(key.startsWith('on'))this.handlers[key] = props[key]
        })
    }
}
