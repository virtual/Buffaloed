import React, { Component } from 'react';
import FeatureCard from '../featurecard/FeatureCard';
import { Card } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
let axios = require('axios');

var FeatureCards = observer(class FeatureCards extends Component {
  constructor(){
    super();
    this.randomizeSights = this.randomizeSights.bind(this);
    this.state = {
      order: 'normal',
      limit: 100
    }
  }

  componentDidMount(){
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
  render(){
    let sightList = []; 
    if (this.props.sightStore.sights){
      let localSights = this.props.sightStore.sights.slice();//makes a copy array to manipulate
      let featureSights = this.randomizeSights(localSights).splice(0, this.state.limit)
      featureSights.forEach((sight, i) => {
        sightList.push(
        <FeatureCard sight={sight} key={i} />
        );
      });
    }
  
    return (
      <Card.Group stackable={true} itemsPerRow={3}>
        {sightList}
      </Card.Group>
    );
  }
})
export default inject('sightStore')(FeatureCards);