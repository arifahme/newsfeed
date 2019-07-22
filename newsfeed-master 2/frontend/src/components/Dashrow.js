import React, { Component } from 'react'
import Article from './Article'
import '../css/Dashrow.css'
import ArticlePage from './ArticlePage'

class Dashrow extends Component
{

  render(){
    var id1 = "article" + this.props.rownum
    var id2 = "article" + (this.props.rownum + 1)
    var id3 = "article" + (this.props.rownum + 2)
    return(
      <div id="dashrow" class="row">
        <div class="col-sm-4">
          <Article article={this.props.first} id={id1}/>
        </div>
        <div class="col-sm-4">
          <Article article={this.props.second} id={id2}/>
        </div>
        <div class="col-sm-4">
          <Article article={this.props.third} id={id3}/>
        </div>
        <br/>
        <br/>
        <ArticlePage article={this.props.first} id={id1}/>
        <ArticlePage article={this.props.second} id={id2}/>
        <ArticlePage article={this.props.third} id={id3}/>

      </div>
    )
  }
}
export default Dashrow
