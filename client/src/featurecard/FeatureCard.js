import React, { Component } from 'react';
import { Card, Icon, Button } from 'semantic-ui-react'



export default class FeatureCard extends Component {
  constructor(){
    super()

  }
  render () {
    console.log(this.props.poi);
    const extra = (
      <Button primary>Learn more</Button>
    )
    
    return (
      
    
      <Card
      image={this.props.poi.img}
      header={this.props.poi.name}
      meta='Friend'
      description={this.props.poi.desc}
      extra={extra}
      />
     
    );
  }
}

