import React, { Component } from 'react';
import FeatureMap from './Map';
import FeatureCards from '../featurecards/FeatureCards';
export default class Sights extends Component {
  render () { 
    return (
      <div>
        <h1>Sights</h1>
        <FeatureCards />
        <FeatureMap />
      </div>
    );
  }
}