import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import AppContainer from './surfaceContainer';
import reducer from './reducers';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

const store = createStore(reducer);

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <AppContainer></AppContainer>
  </Provider>,
  document.getElementById('root')
);
