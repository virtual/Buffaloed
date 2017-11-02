import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom'; 

export default class FeatureCard extends Component {

  render () {
    var link = "/sight/" + this.props.sight.slug;
    var img = '/img/sights/' + this.props.sight.img;
    let meta = '';
    if (this.props.sight.type) {
      meta = this.props.sight.type
    }
    const extra = (
      <p>Learn more</p>
    ) 
    return (
      <Card 
      fluid={true}
      color='blue'
      as={Link} to={link}
      image={img}
      header={this.props.sight.name}
      meta={meta}
      description={this.props.sight.desc}
      extra={extra}
      />
    );
  }
}