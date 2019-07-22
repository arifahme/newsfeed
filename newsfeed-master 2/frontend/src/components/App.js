import React, { Component } from 'react'

import '../css/App.css'
import NavigationBar from './NavigationBar'
import LoginPopup from './LoginPopup'
import RegisterPopup from './RegisterPopup'
import Profile from './Profile'

class App extends Component
{
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
    }
  }

  render() {
    return (
      <div className="App" id="app">
        <NavigationBar/>
        <LoginPopup />
        <RegisterPopup />
        <Profile />
      </div>
    )
  }
}

export default App
