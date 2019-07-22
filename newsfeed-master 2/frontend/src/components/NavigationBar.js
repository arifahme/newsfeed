import React from "react";
import { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../css/NavigationBar.css'

import TopicNav from './TopicNav'
import TitleNav from './TitleNav'
import Dashrow from './Dashrow'
import Bubbles from './Bubbles'



class NavigationBar extends Component {
  constructor(props) {
    super(props)
    this.loadAll()
    this.state = {
      loggedIn: true
    }
    // get initial articles
  }
  loadAll = async () => {
    try {
      let response = await fetch(`/all`)
      let articles = await response.json()
      let rows = []
      if (articles !== undefined) {
        // format each article as JSON
        for (let i = 0 ; i < articles.length - 2 ; i += 3){
          rows.push(<Dashrow first={articles[i]} second={articles[i+1]} third={articles[i+2]} rownum={i}/>)
        }
        // load all topics of news
        this.setState({
          topic: "all",
          title: "Today's News",
          rows: rows
        })
      }
    }
    catch (error) {
      // Nice error message in case this goes wrong
      alert("Nothing newsworthy today, try again later!")
    }
  }
  // called by child component "TopicNav" upon clicking a topic name
  update = async (data) => {
    // update the topic, the articles, and the title
    if (data !== undefined){
      let rows = []
      // render all of the articles of the requested topic for the user
      for (let i = 0 ; i < data.articles.length - 2 ; i += 3){
        rows.push(<Dashrow first={data.articles[i]} second={data.articles[i+1]} third={data.articles[i+2]} rownum={i} />)
      }
      this.setState({
        topic: `${data.topic}`,
        title: `${data.title}`,
        rows: rows
      })
    }
  }
  render(){
    if (this.state == null){
      return(<div></div>)
    }
    else {
      return(
        <div>
          <div class="container-fluid fixed-top">
            <TitleNav />
            <TopicNav update={this.update.bind(this)}/>
          </div>
          <div>
            <Bubbles/>
            < br/>< br/>< br/>< br/>< br/>< br/>
            <h1 class="text-center">Today's News</h1>
            <h2 class="text-center">{this.state.title}</h2>
            {/*
              this state variable below is where
              this state variable below is where
              the articles are currently rendered from
            */}
            {this.state.rows}
          </div>
        </div>
      )
    }
  }
}

export default NavigationBar
