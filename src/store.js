import { createStore, compose } from 'redux'
import scuttlebutt, { devToolsStateSanitizer } from 'redux-scuttlebutt'
import reducers from './reducers'

const enhancer = compose(
  scuttlebutt({
    uri: 'http://localhost:8081',
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__({ stateSanitizer: devToolsStateSanitizer })
    : f => f
)

const store = createStore(reducers, undefined, enhancer)
export default store
