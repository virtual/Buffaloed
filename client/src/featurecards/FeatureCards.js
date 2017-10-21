import React, { Component } from 'react';
import FeatureCard from '../featurecard/FeatureCard';
import { Card } from 'semantic-ui-react';

export default class FeatureCards extends Component {
  constructor(){
    super();
    this.fetchSights = this.fetchSights.bind(this);
    this.randomizeSights = this.randomizeSights.bind(this);
    this.state = {
      sights: [],
      order: 'normal',
      limit: 100
    }
  }

  componentDidMount(){
    this.fetchSights();
    
    if (this.props.order) {
      this.setState({
        order: this.props.order
      })
    }
    if (this.props.limit) {
      this.setState({
        limit: this.props.limit
      })
    }
  }

  randomizeSights(obj) {
    if (this.state.order === 'random') {
      return obj.sort(function (a, b) {return Math.random() - 0.5;});
    } else {
      return obj;
    }
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
          sights: this.randomizeSights(sightObj).splice(0, this.state.limit)
        });
      }  else {
        console.log('undefined');
      }
    });
  }

  render(){
 
  let sightList = []; 
  this.state.sights.forEach((sight, i) => {
    sightList.push(
      <FeatureCard sight={sight} key={i} />
    );
  });
  return (
      <Card.Group stackable={true} itemsPerRow={3}>
        {sightList}
      </Card.Group>
    );
  }
}