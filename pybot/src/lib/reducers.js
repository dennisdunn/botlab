import { combineReducers } from 'redux'
import Logging from './reducers/logging'
import Nav from './reducers/navigation'
import Power from './reducers/power'

const rootReducer = combineReducers({ Logging, Nav, Power})
export default rootReducer