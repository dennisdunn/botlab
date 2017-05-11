import { combineReducers } from 'redux'
import Logging from './reducers/logging'
import Nav from './reducers/navigation'
import Power from './reducers/power'
import Button from './reducers/button'

const rootReducer = combineReducers({ Logging, Nav, Power, Button})
export default rootReducer