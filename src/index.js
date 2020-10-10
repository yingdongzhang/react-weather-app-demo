import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import App from './App'
import AppWithHooks from './AppWithHooks'
import store from './app/store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Provider store={store}>
    {/* <App /> */}
    <AppWithHooks />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
