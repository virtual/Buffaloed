import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
let axios = require('axios');

export default class FeatureCard extends Component {
  constructor(){
    super();
  }

  render () {
    var link = "/sight/" + this.props.sight.slug;
    var img = '/img/sights/' + this.props.sight.img;
    let meta = '';
    if (this.props.sight.type) {
      meta = this.props.sight.type
    }
    const extra = (
      <a href={link}>Learn more</a>
    ) 
    return (
      <Card
      fluid={true}
      color='blue'
      href={link} 
      image={img}
      header={this.props.sight.name}
      meta={meta}
      description={this.props.sight.desc}
      extra={extra}
      />
    );
  }
}