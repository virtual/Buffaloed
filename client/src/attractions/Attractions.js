import React, { Component } from 'react';
import CheckBox from './Checkbox';
import StartButton from './Button';
import FeatureMap from './Map';
import Leaderboard from './Leaderboard';
import FeatureCards from '../featurecards/FeatureCards';
import QuizBox from '../quiz/Quiz';
export default class Attractions extends Component {
  render () {
    return (
      <div>
        <h1>List of Attractions..coming soon</h1>
        <QuizBox/>
        <FeatureCards />
        <CheckBox />
         <StartButton />
         <FeatureMap />
         <Leaderboard />
      </div>
      
    );
  }
}