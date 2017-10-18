import React, { Component } from 'react';
import FeatureCard from '../featurecard/FeatureCard';
import { Card } from 'semantic-ui-react';

export default class FeatureCards extends Component {
  constructor(){
    super();
    this.fetchSights = this.fetchSights.bind(this);
    this.state = {
      sights: [] 
    }
  }

  componentDidMount(){
    this.fetchSights();
  }

  fetchSights() {
    var url = '/sightsInfo';

    fetch(url, {
      method: "post",
      headers:{"Content-Type":"application/json"}, 
      body: { 
        slug: ''
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

  render(){
 
  let sightList = []; 
  this.state.sights.forEach((sight) => {
    sightList.push(
      <FeatureCard sight={sight} />
    );
  });
  return (
      <Card.Group itemsPerRow={3}>
        {sightList}
      </Card.Group>
    );
  }
}