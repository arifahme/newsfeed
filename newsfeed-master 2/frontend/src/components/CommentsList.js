import React from "react";
import { Component } from 'react'
import Comment from './Comment'

import {whoami} from './tools.js'

class CommentsList extends Component{
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
  render(){
    return(
      <div class="tab-pane active" id="commentslist">
          <ul class="list-unstyled">
            <Comment />
            <Comment />
            <Comment />
          </ul>
      </div>
    )
  }
}
export default CommentsList
