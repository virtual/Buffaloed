import React, { Component } from 'react';
import FeatureCard from '../featurecard/FeatureCard';
import { Card } from 'semantic-ui-react';

export default class FeatureCards extends Component {
  constructor(){
    super();
    this.fetchPOIs = this.fetchPOIs.bind(this);
    this.state = {
      pois: [{ name: "", lat: "", lng: "", img: "", desc: "", slug: ""}]
    }
      }

  componentDidMount(){
    this.fetchPOIs();
  }

  fetchPOIs() {
    var url = '/poi';
    fetch(url).then(function (response) {
      return response.json();
    }).then((poiObj) => {
      if (poiObj !== undefined) {
        console.log(poiObj);
        this.setState({ 
          pois : poiObj
        });
      }  else {
        console.log('undefined');
      }
    });
  }

  render(){

    



  let poiList = [];
  console.log(this.state.pois);
  this.state.pois.forEach((poi) => {
    poiList.push(
      <FeatureCard poi={poi} />
    );
  });
  return (
      <Card.Group itemsPerRow={3}>
        {poiList}
      </Card.Group>
    );
  }
}