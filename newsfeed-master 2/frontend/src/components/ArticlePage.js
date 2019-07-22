import React from "react"
import { Component } from 'react'
import stock from '../img/stock.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import CommentsPopup2 from './CommentsPopup2'
import SharePopup2 from './SharePopup2'
import {faCommentAlt, faArrowCircleUp, faArrowCircleDown, faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import '../css/ArticlePage.css'

import {upvote, downvote, whoami} from './tools.js'

class ArticlePage extends Component{
  constructor(props) {
    super(props)

    this.state = {
      articlescore: this.props.score,
      isMouseInside1: false,
      isMouseInside2: false,
      scoreIncreased: false,
      scoreDecreased: false,
      color1: false,
      color2: false
    }
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

  //increment article score member variable
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
  hoverOn2 = async (e) =>{
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
    var score = this.state.articlescore
    var imageUrl
    if(!this.props.article.urlToImage){
      imageUrl=stock
    }
    else{
      imageUrl=this.props.article.urlToImage
    }
    var shareid = "#share" + this.props.id
    var commentsid = "#comments" + this.props.id
    var close = "#" + this.props.id
    return(
      <div class="modal hide fade" id={this.props.id} role="dialog">
        <div class="modal-dialog modal-dialog-centered">

          <div class="modal-content">

            <div class="modal-header bg-light">
              <h4 class="modal-title">{this.props.article.title}</h4>
              <button type="button" class="close" data-toggle="modal" data-target={close}>&times;</button>
            </div>

            <div class="modal-body">
              <img class="float-center" alt="article thumbnail" src={imageUrl}/>
              <div class="card-body row text-center" id="comments">
                  <div id="iconcol1" class="col-sm-4" align="center">
                    &nbsp; <a  id="comments" href="/" data-toggle="modal" data-target={commentsid}><FontAwesomeIcon icon={faCommentAlt}/>&nbsp; Comments</a>
                  </div>
                  <div id="iconcol1" class="col-sm-4">
                    <span class="incdec" id="comments" style={{color: (this.state.isMouseInside1 || this.state.color1) ? 'orange' : 'black' }} onMouseEnter={this.hoverOn1} onMouseLeave={this.hoverOff1} onClick={this.increaseScore.bind(this)}>
                    <FontAwesomeIcon icon={faArrowCircleUp}/>
                    </span>
                    &nbsp; {score} &nbsp;
                    <span class="incdec" id="comments" style={{color: (this.state.isMouseInside2 || this.state.color2) ? 'royalblue' : 'black' }} onMouseEnter={this.hoverOn2} onMouseLeave={this.hoverOff2} onClick={this.decreaseScore.bind(this)}>
                      <FontAwesomeIcon icon={faArrowCircleDown}/>
                    </span>
                  </div>
                  <div id="iconcol1" class="col-sm-4">
                    <a id="comments" href="/" data-toggle="modal" data-target={shareid}><FontAwesomeIcon icon={faPaperPlane}/>&nbsp; Share link</a>&nbsp;
                  </div>

                  <hr />
                  <div id="articleAuthor"><strong>By {this.props.article.author}</strong></div>
                  <hr />
                  <p align="left" id="articleContent">{this.props.article.content}</p>
                </div>
            </div>

          </div>
        </div>
        <CommentsPopup2 id={this.props.id}/>
        <SharePopup2 id={this.props.id}/>
      </div>
    )
  }
}

export default ArticlePage
