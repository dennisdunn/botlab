import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/appContainer';
import rootReducer from './lib/reducers';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <AppContainer></AppContainer>
  </Provider>,
  document.getElementById('root')
);
