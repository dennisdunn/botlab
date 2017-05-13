import { combineReducers } from 'redux'
import Logging from './logging'
import Nav from './nav'
import Power from './power'
import Button from './button'

const rootReducer = combineReducers({ Logging, Nav, Power, Button})
export default rootReducer