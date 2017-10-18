import React, { Component } from 'react';
import { Card, Icon, Button } from 'semantic-ui-react'



export default class FeatureCard extends Component {
  constructor(){
    super()

  }
  render () {
    console.log(this.props.sight);
    var link = "/sights/" + this.props.sight.slug;
    const extra = (
      <a href={link}>Learn more</a>
    )
    
    return (
      
    
      <Card
      image={this.props.sight.img}
      header={this.props.sight.name}
      meta='Friend'
      description={this.props.sight.desc}
      extra={extra}
      />
     
    );
  }
}

