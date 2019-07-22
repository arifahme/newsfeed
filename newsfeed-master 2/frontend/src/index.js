import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Profile from './components/Profile'
import App from './components/App'
import ArticlePage from './components/ArticlePage'
import * as serviceWorker from './serviceWorker'

const routing = (
  <Router>
  <div>
    <Route exact path="/" component={App} />
    <Route path="/profile" component={Profile} />
    <Route path="/articlepage" component={ArticlePage} />
  </div>
  </Router>

)
ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
