import React from 'react'
import { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faHistory, faListUl } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import HistoryPopup from './HistoryPopup'
import TopicsPopup from './TopicsPopup'
import '../css/Profile.css'

import {whoami} from './tools.js'

class Profile extends Component{
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: true,
      user: {
        firstname: "Austin",
        lastname: "Traver",
        username: "austintraver"
      }
    }
  }
  findMyself = async () => {
    return await whoami()
  }
  render(){
    return(
      <div class="modal hide fade" id="profilemodal" role="dialog">
        <div class="modal-dialog modal-dialog-centered">

          <div class="modal-content">

            <div class="modal-header bg-light">
              <h4 class="modal-title">Profile </h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
            <center>
                <FontAwesomeIcon icon={faUserCircle} size="8x"/><br />
                <h1 class="display-3"><strong>{`${this.state.user.firstname}\n${this.state.user.lastname}`}</strong></h1>
                <h5>{`@${this.state.user.username}`}</h5><br /><br />
                <div class="container">
                  <button type="button" class="btn btn-outline-dark btn-lg" data-toggle="modal" data-target="#topicsmodal"><FontAwesomeIcon icon={faListUl} /> Topics</button>  &nbsp;
                  <button type="button" class="btn btn-outline-dark btn-lg" data-toggle="modal" data-target="#modal2"> <FontAwesomeIcon icon={faHistory} /> History</button>
                </div>
              </center>
            </div>

          </div>
        </div>
        <TopicsPopup />
        <HistoryPopup />
      </div>

    )
  }
}

export default Profile
