import React from "react";
import { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'


class SharePopup2 extends Component{
  constructor(params){
    super(params)
    this.handleMessage = this.handleMessage.bind(this)
    this.handleNumber = this.handleNumber.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.state = {
      message: ""
    }
  }

  copyToClipboard(e){
    this.textArea.select()
    document.execCommand('copy')
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus()
  }

  handleMessage(e){
    this.setState({
      message: e.target.value
    })
  }
  handleNumber(e){
    this.setState({
      number: e.target.value
    })
  }

  // POST request to share a message to a friend's phone number
  sendMessage(e){
    // POST request to register a user in the database

    let data = {
      username: `${this.state.message}`,
      password: `${this.state.recipient}`
    }

    let request = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch("/share", request)
    .then( (response) => {
      alert(response) // TODO remove, purpose is for debug
      window.location.reload()
    })
    .catch( (exception) => {
      alert(exception.message)
    })
  }

  render(){
    var shareid = "share" + this.props.id
    var shareidclose = "#share" + this.props.id
    return(
      <div class="modal fade" id={shareid} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"><FontAwesomeIcon icon={faPaperPlane}/>
              </h5>
              <button type="button" class="close" data-toggle="modal" data-target={shareidclose} aria-label="Close">
                <span aria-hidden="true">
                  &times;
                </span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={this.sendMessage}>
                <div class="form-group">
                  <label for="copylink">
                    Share this article with your friend!
                  </label>
                  <div class="input-group mb-3">
                    <input ref={(textarea) => this.textArea = textarea}
                      id="copylink"
                      type="text"
                      class="form-control"
                      value={this.state.message}
                      onChange={this.handleMessage}
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2">
                    </input>
                    <br></br>
                    <input type="user" class="form-control" value={this.state.number} onChange = {this.handleNumber} id="number" placeholder="+16507303237">
                    </input>
                    {
                      document.queryCommandSupported('copy') &&
                      <div class="input-group-append">
                        <button class="btn btn-outline-primary" onClick={this.sendMessage}>
                          Share
                        </button>
                      </div>
                    }
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-toggle="modal" data-target={shareidclose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default SharePopup2
