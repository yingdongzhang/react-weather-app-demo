import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import App from './App'
import AppWithHooks from './AppWithHooks'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  // <App />,
  <AppWithHooks />,
  document.getElementById('root')
)

// setInterval(() => {
//   if (Date.now() %2 === 0) {
//     ReactDOM.render(
//         <App />,
//         // <AppWithHooks />,
//       document.getElementById('root')
//     )
//   } else {
//     ReactDOM.render(
//         <h1>hello</h1>,
//       document.getElementById('root')
//     )
//   }
// }, 1000)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
