import React from "react";
import { Component } from 'react'
import CommentsList from './CommentsList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCommentAlt} from '@fortawesome/free-solid-svg-icons'

import {whoami} from './tools.js'

class CommentsPopup extends Component{
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
        loggedIn: false,
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

  postComment = async (e) => {
    //onsubmit for comments form
    e.preventDefault();
    alert(`You must be logged in to comment`)
  }

  render(){
    var disabled = !this.state.loggedIn;
    let message;
    if (!this.state.loggedIn) {
      message = <h5>Must <a href="/" data-toggle="modal" data-target="#myModal1" data-dismiss="modal" class="text-primary">log in</a> to comment.</h5>;
    }else{
      message ="Comment"
    }
    return(
      <div class="modal fade" id="commentsModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"><FontAwesomeIcon icon={faCommentAlt}/></h5>
              <button type="button" class="close" data-toggle="modal" data-target="#commentsModal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" >
              <ul class="nav nav-tabs" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Comments</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="profile-tab" data-toggle="tab" href="#menu1" role="tab" aria-controls="menu1" aria-selected="false">Add a Comment</a>
                </li>
              </ul>
              <br/><br/>
              <div class="tab-content">
                <div id="home" class="tab-pane active">
                  <CommentsList loggedIn={this.state.loggedIn}/>
                </div>
                <div id="menu1" class="tab-pane fade">
                  <form onSubmit={this.postComment} class="form-horizontal" id="commentForm">

                      <div class="form-group">

                          <label for="email" class="col-sm-auto control-label">{message}</label>
                          <div class="col-sm-10">
                            <textarea class="form-control" name="addComment" id="addComment" rows="5" disabled={ disabled }></textarea>
                          </div>
                      </div>
                      <div class="form-group">
                          <div class="col-sm-offset-2 col-sm-10">
                              <button class="btn btn-success btn-circle text-uppercase" type="submit" id="submitComment" disabled={ disabled }><span class="glyphicon glyphicon-send"></span> Submit comment</button>
                          </div>
                      </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#commentsModal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CommentsPopup
