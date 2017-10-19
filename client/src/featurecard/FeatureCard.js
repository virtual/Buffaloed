import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'

export default class FeatureCard extends Component {
  constructor(){
    super();
    this.fetchSight = this.fetchSight.bind(this);
    this.state = {
      sights: [{ name: "", lat: "", lng: "", img: "", desc: "", slug: ""}]
    }
  }
  fetchSight() {
    var url = '/sightsInfo';

    fetch(url, {
      method: "post",
      headers:{"Content-Type":"application/json"}, 
      body: { 
        slug: this.props.sight.slug
      }
    }).then(function (response) {
      
      return response.json();
    }).then((sightObj) => {
      if (sightObj !== undefined) { 
        this.setState({ 
          sights : sightObj
        });
      }  else {
        console.log('undefined');
      }
    });
  }
  render () {
    var link = "/sight/" + this.props.sight.slug;
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