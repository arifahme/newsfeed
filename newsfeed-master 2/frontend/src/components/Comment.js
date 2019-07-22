import React from "react";
import { Component } from 'react'
import '../css/Comment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowCircleUp, faArrowCircleDown} from '@fortawesome/free-solid-svg-icons'

import {upvote, downvote, whoami} from './tools.js'

class Comment extends Component{
  constructor(props) {
    super(props);

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
      articlescore: 1, // TODO hardcoded
      isMouseInside1: false,
      isMouseInside2: false,
      scoreIncreased: false,
      scoreDecreased: false,
      color1: false,
      color2: false
    }
  }
  findMyself = async () => {
    return await whoami()
  }
  //increment comment score member variable
  increaseScore = async (e) => {
    e.preventDefault()
    if(this.state.loggedIn && !this.state.scoreDecreased && !this.state.scoreIncreased){
      this.setState({
        articlescore: this.state.articlescore + 1,
        scoreIncreased: true,
        color1:true
      })
      await(upvote)
    }
    else if(this.state.loggedIn && this.state.scoreIncreased){
      this.setState({
        articlescore: this.state.articlescore - 1,
        scoreIncreased: false,
        color1: false
      })
      await(downvote)
    }
  }
  //decrement article score member variable
  decreaseScore = async (e) => {
    e.preventDefault()
    if(this.state.loggedIn && !this.state.scoreDecreased && !this.state.scoreIncreased){
      this.setState({
        articlescore: this.state.articlescore - 1,
        scoreDecreased:true,
        color2:true
      })
      await(downvote)
    }
    else if(this.state.loggedIn && this.state.scoreDecreased){
      this.setState({
        articlescore: this.state.articlescore + 1,
        scoreDecreased: false,
        color2: false
      })
      await(upvote)
    }
  }
  hoverOn1 = async (e) => {
    e.preventDefault()
    if(this.state.loggedIn){
      this.setState({
        isMouseInside1: true
      })
    }
  }
  hoverOff1 = async (e) => {
    e.preventDefault()
    this.setState({
      isMouseInside1: false
    })
  }
  hoverOn2 = async (e) => {
    e.preventDefault()
    if(this.state.loggedIn){
      this.setState({
        isMouseInside2: true
      })
    }
  }
  hoverOff2 = async (e) => {
    e.preventDefault()
    this.setState({
      isMouseInside2: false
    })
  }
  render(){
    return(
      <div class="row" id="comment">
        <div id="iconcol" class="col-sm-1 vcenter">
          <center>
            <span class="incdec" id="uparrow" style={{color: (this.state.isMouseInside1 || this.state.color1) ? 'orange' : 'black' }} onMouseEnter={this.hoverOn1} onMouseLeave={this.hoverOff1} onClick={this.increaseScore.bind(this)}><FontAwesomeIcon icon={faArrowCircleUp}/></span><br/>
            {this.state.articlescore}<br/>
            <span class="incdec" id="downarrow" style={{color: (this.state.isMouseInside2 || this.state.color2) ? 'royalblue' : 'black' }} onMouseEnter={this.hoverOn2} onMouseLeave={this.hoverOff2} onClick={this.decreaseScore.bind(this)}><FontAwesomeIcon icon={faArrowCircleDown}/>  </span>
          </center>
        </div>
        <div class="col-sm-11">
          <li class="media bg-light">
            <div class="media-body">
              <div class="card card-body bg-light">
                  <h4 class="media-heading text-uppercase reviews"> </h4>
                  <div class="media-date text-uppercase reviews list-inline">
                    <small> </small>
                  </div>
                  <p class="media-comment">
                    
                  </p>
              </div>
            </div>
          </li>
          <br />
        </div>
      </div>

    )
  }
}
export default Comment
