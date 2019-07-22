import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import validator from 'validator';

class RegisterPopup extends Component{

  constructor( props )
  {
    super( props )
    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setUsername = this.setUsername.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.setFirstName = this.setFirstName.bind(this)
    this.setLastName = this.setLastName.bind(this)
  }

  setUsername = async (e) => {
    e.preventDefault()
    this.setState({username: e.target.value})
  }

  setPassword = async (e) => {
    e.preventDefault()
    this.setState({password: e.target.value})
  }

  setFirstName = async (e) => {
    e.preventDefault()
    this.setState({firstname: e.target.value})
  }

  setLastName = async (e) => {
    e.preventDefault()
    this.setState({lastname: e.target.value})
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    let data = {
      username: `${this.state.username}`,
      password: `${this.state.password}`,
      firstname: `${this.state.firstname}`,
      lastname: `${this.state.lastname}`
    }

    if (validator.isEmpty(data.username)) {
      alert("Error: username can not be left blank.")
    }
    if (validator.isEmpty(data.password)) {
      alert("Error: password can not be left blank.")
    }
    if (validator.isEmpty(data.firstname)) {
      alert("Error: first name can not be left blank.")
    }
    if (validator.isEmpty(data.lastname)) {
      alert("Error: last name can not be left blank.")
    }

    try {
      let response = await fetch("/register", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // if MongoDB throws a duplicate key error
      if (!response.ok) {
        alert("Error: that username taken")
      }
      else {
        alert("Welcome to NewsFeed!")
        window.location.reload()
      }
    }
    catch (error) {
      alert(error.message)
    }
  }

  render(){
    return(
      <div class="container" id="registerpopup">
      <div class="modal fade" id="myModal2" role="dialog">
      <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
      <div class="modal-header bg-primary text-white">
      <h4 class="modal-title">Register  <FontAwesomeIcon icon={faUserPlus}/>
      </h4>
      <button type="button" class="close text-white" data-dismiss="modal">
      &times;
      </button>
      </div>
      <div class="modal-body">
      <form onSubmit = {this.handleSubmit}>
      <div class="form-group row">
      <div class="col-sm-1">
      </div>
      <div class="col-sm-6">
      <input type="user" onChange = {this.setFirstName} class="form-control" placeholder="First Name">
      </input>
      </div>
      <div class="col-sm-5" >
      <input type="user" onChange = {this.setLastName} class="form-control" placeholder="Last Name">
      </input>
      </div>
      </div>
      <div class="form-group row">
      <label for="exampleInputEmail1" class="col-sm-1 col-form-label text-secondary">
      <FontAwesomeIcon icon={faUser }/>
      </label>
      <div class="col-sm-11">
      <input type="user" class="form-control" onChange = {this.setUsername} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username">
      </input>
      </div>
      </div>
      <div class="form-group row">
      <label for="exampleInputEmail1" class="col-sm-1 col-form-label text-secondary"><FontAwesomeIcon icon={faLock}/>
      </label>
      <div class="col-sm-11">
      <input type="password" class="form-control" onChange = {this.setPassword} id="exampleInputPassword1" placeholder="Password">
      </input>
      </div>
      </div>
      <button type="submit" class="btn btn-primary">
      Register
      </button>
      </form>
      </div>
      </div>
      </div>
      </div>
      </div>
    )
  }
}
export default RegisterPopup
