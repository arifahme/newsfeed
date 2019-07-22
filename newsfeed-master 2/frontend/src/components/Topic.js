import React, { Component} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '../css/NavigationBar.css'

import {whoami} from './tools.js'

class Topic extends Component {
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
      search: ""
    }
  }
  findMyself = async () => {
    return await whoami()
  }
  // GET request to the Express server
  // delivers articles from the database to avoid overusing NewsAPI calls
  handleClick = async () => {
    let response = await fetch(`/${this.props.link}`)
    let newArticles = await response.json()
    // calls the update() function of the parent component, NavigationBar
    // and sets the state of the NavigationBar component, to have
    // "newArticles" the new articles that we have pulled
    this.props.update({
      articles: newArticles,
      topic: `${this.props.link}`,
      title: `${this.props.title}`
    })
  }
  render() {
    return (
      <li class="nav-item nav-link" id="topic" onClick={this.handleClick}>
        {this.props.title}
      </li>
    )
  }
}

export default Topic
