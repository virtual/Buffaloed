import React, { Component } from 'react';
import FeatureCards from '../featurecards/FeatureCards';

export default class Homepage extends Component {
  render () {
    return (
      <div>
        <h1>Welcome!!</h1>
        <FeatureCards />

      </div>
    );
  }
}