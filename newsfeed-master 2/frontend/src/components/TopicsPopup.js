import React from 'react'
import { Component } from 'react'

import {whoami} from './tools.js'

class TopicsPopup extends Component{
  constructor(props){
    super(props)
    let user = this.findMyself()
    if (this.user !== null){
      this.state = {
        loggedIn: true,
        user: user
      }
    }
    else {
      this.state = {
        loggedIn: false,
        user: {
          firstname: "",
          lastname: "",
          username: ""
        }
      }
    }
    this.state = {
      checked1: true,
      checked2: true,
      checked3: true,
      checked4: true,
      checked5: true,
      checked6: true,
    }
    this.toggleCheck1 = this.toggleCheck1.bind(this)
    this.toggleCheck2 = this.toggleCheck2.bind(this)
    this.toggleCheck3 = this.toggleCheck3.bind(this)
    this.toggleCheck4 = this.toggleCheck4.bind(this)
    this.toggleCheck5 = this.toggleCheck5.bind(this)
    this.toggleCheck6 = this.toggleCheck6.bind(this)
    this.saveTopics = this.saveTopics.bind(this)
  }
  findMyself = async () => {
    return await whoami()
  }

  toggleCheck1 = async () => {
    this.setState({checked1: !this.state.checked1})
  }
  toggleCheck2 = async () => {
    this.setState({checked2: !this.state.checked2})
  }
  toggleCheck3 = async () => {
    this.setState({checked3: !this.state.checked3})
  }
  toggleCheck4 = async () => {
    this.setState({checked4: !this.state.checked4})
  }
  toggleCheck5 = async () => {
    this.setState({checked5: !this.state.checked5})
  }
  toggleCheck6 = async () => {
    this.setState({checked6: !this.state.checked6})
  }

  saveTopics = async (e) => {
    e.preventDefault()
    //onclick for save changes button
    let update = []

    if(this.refs.entertainment.checked){
      update.push('entertainment')
    }
    if(this.refs.sports.checked){
      update.push('sports')
    }
    if(this.refs.politics.checked){
      update.push('politics')
    }
    if(this.refs.technology.checked){
      update.push('technology')
    }
    if(this.refs.business.checked){
      update.push('business')
    }
    if(this.refs.science.checked){
      update.push('science')
    }
    let data = {
      topic: update
    }
    let request = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      fetch("/update", request)
    }
    catch (error) {
      alert( error.message )
    }
  }

  render(){
    return(
      <div class="modal fade" id="topicsmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">My Topics</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

            <div class="funkyradio">
              <div class="funkyradio-other">
                  <input type="checkbox" name="radio" id="radio1"  ref="entertainment" onClick={this.toggleCheck1} checked={this.state.checked1} />
                  <label for="radio1">Entertainment</label>
              </div>
              <div class="funkyradio-primary">
                  <input type="checkbox" name="radio" id="radio2" ref="sports" onClick={this.toggleCheck2} checked={this.state.checked2}/>
                  <label for="radio2">Sports</label>
              </div>
              <div class="funkyradio-success">
                  <input type="checkbox" name="radio" id="radio3" ref="politics" onClick={this.toggleCheck3} checked={this.state.checked3}/>
                  <label for="radio3">Politics</label>
              </div>
              <div class="funkyradio-danger">
                  <input type="checkbox" name="radio" id="radio4" ref="technology" onClick={this.toggleCheck4} checked={this.state.checked4}/>
                  <label for="radio4">Technology</label>
              </div>
              <div class="funkyradio-warning">
                  <input type="checkbox" name="radio" id="radio5" ref="business" onClick={this.toggleCheck5} checked={this.state.checked5}/>
                  <label for="radio5">Business</label>
              </div>
              <div class="funkyradio-info">
                  <input type="checkbox" name="radio" id="radio6" ref="science" onClick={this.toggleCheck6} checked={this.state.checked6}/>
                  <label for="radio6">Science</label>
              </div>
          </div>
            </div>
            <div class="modal-footer">
              <button onClick={this.saveTopics} type="button" class="btn btn-primary" data-toggle="modal" data-target="#topicsmodal">Save changes</button>
              <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#topicsmodal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default TopicsPopup
