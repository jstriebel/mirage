import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import scuttlebutt, { devToolsStateSanitizer } from 'redux-scuttlebutt'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker'
import reducers from './reducers'

import { graphStore } from './Controller'

const enhancer = compose(
  scuttlebutt({
    uri: 'http://localhost:8081',
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__({ stateSanitizer: devToolsStateSanitizer })
    : f => f
)

const store = createStore(reducers, undefined, enhancer)

graphStore.setReduxMethods(store.dispatch, store.getState)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
registerServiceWorker();
