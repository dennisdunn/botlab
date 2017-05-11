import React from 'react'
import ReactDOM from 'react-dom'
import NavControl from './components/nav'
import PowerControl from './components/power'
import ButtonControl from './components/button'
import rootReducer from './lib/reducers'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import coord from './lib/coordinateTransforms'

const store = createStore(rootReducer, applyMiddleware(thunk));

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <svg width='300' height='300'>
      <NavControl id='navpanel'></NavControl>
      <PowerControl id='powerpanel'></PowerControl>
      <ButtonControl id='buttonpanel'></ButtonControl>
    </svg>
  </Provider>,
  document.getElementById('root')
);
