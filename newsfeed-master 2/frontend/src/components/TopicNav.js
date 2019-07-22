import React, { Component} from "react"

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '../css/NavigationBar.css'

import Topic from './Topic'

class TopicNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: true,
    }
  }
  update = async (data) => {
    console.log(`topic nav says new topic is ${data.topic}`)
    await this.props.update(data)
  }
  render(){
    return(
        <div id="topicnav" class="row">
          <nav class="navbar navbar-expand-sm bg-light navbar-light w-100" id="topics" >
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent2" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent2">
                <ul class="navbar-nav nav-fill w-100">
                  <Topic title="All Categories" link="all" update={this.update.bind(this)} />
                  <Topic title="Entertainment" link="entertainment" update={this.update.bind(this)}/>
                  <Topic title="Sports" link="sports" update={this.update.bind(this)}/>
                  <Topic title="Politics" link="politics" update={this.update.bind(this)}/>
                  <Topic title="Technology" link="technology" update={this.update.bind(this)}/>
                  <Topic title="Business" link="business" update={this.update.bind(this)}/>
                  <Topic title="Science" link="science" update={this.update.bind(this)}/>
                </ul>
              </div>
          </nav>
        </div>
    )
  }
}
export default TopicNav
