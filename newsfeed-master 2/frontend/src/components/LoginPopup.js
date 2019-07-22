import React from 'react'
import { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faKey, faUser, faLock } from '@fortawesome/free-solid-svg-icons'

class LoginPopup extends Component{

  constructor( props )
  {
    super( props )
    this.state = {
      username: "",
      password: "",
    }
  }

  setUsername = async (e) => {
    e.preventDefault()
    this.setState({username: e.target.value})
  }

  setPassword = async (e) => {
    e.preventDefault()
    this.setState({password: e.target.value})
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    let data = {
      username: `${this.state.username}`,
      password: `${this.state.password}`
    }

    let request = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      console.log(this.state.username)
      console.log(this.state.password)
      let result = await fetch("/login", request)
      let response = await result.json()
      if (response.success === true) {
        alert("Welcome back!")
        window.location.reload()
      }
      else {
        console.log("else")
        alert("Invalid username/password, please try again")
      }
    }
    catch (error) {
      alert("Error, something went wrong")
    }
  }

  render(){
    return(
        <div class="modal hide fade" id="myModal1" role="dialog">
          <div class="modal-dialog modal-dialog-centered">

            <div class="modal-content">
              <div class="modal-header bg-primary text-white">
                <h4 class="modal-title">Login  <FontAwesomeIcon icon={faKey}/></h4>
                <button type="button" class="close text-white" data-dismiss="modal">&times;</button>
              </div>
              <div class="modal-body">
                <form onSubmit = {this.handleSubmit}>
                  <div class="form-group row">
                    <label for="exampleInputEmail1" class="col-sm-1 col-form-label text-secondary"><FontAwesomeIcon icon={faUser }/></label>
                    <div class="col-sm-11">
                      <input type="user" class="form-control" onChange = {this.setUsername} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username"/>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="exampleInputEmail1" class="col-sm-1 col-form-label text-secondary"><FontAwesomeIcon icon={faLock}/></label>
                    <div class="col-sm-11">
                      <input type="password" onChange = {this.setPassword} class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary">Login</button>
                </form>
              </div>
            </div>

        </div>

      </div>
    )
  }
}
export default LoginPopup
