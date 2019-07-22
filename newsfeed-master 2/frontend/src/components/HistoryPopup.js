import React from 'react'
import { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHistory} from '@fortawesome/free-solid-svg-icons'

import {whoami} from './tools.js'

class HistoryPopup extends Component{
  constructor(props) {
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
        loggedIn: true,
        user: {
          firstname: "",
          lastname: "",
          username: ""
        }
      }
    }
  }
  findMyself = async () => {
    return await whoami()
  }
  render(){
    return(
      <div class="modal fade" id="modal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">History <FontAwesomeIcon icon={faHistory}/></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <ul class="list-group">
                <li class="list-group-item">" "</li>
              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#modal2">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default HistoryPopup
