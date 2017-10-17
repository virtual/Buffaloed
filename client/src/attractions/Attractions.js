import React, { Component } from 'react';
import CheckBox from './Checkbox';
import StartButton from './Button';
import FeatureMap from './Map';
import Leaderboard from './Leaderboard';

export default class Attractions extends Component {
  render () {
    return (
      <div>
        <h1>List of Attractions..coming soon</h1>
        <CheckBox />
         <StartButton />
         <FeatureMap />
         <Leaderboard />
      </div>
      
    );
  }
}