import React, { Component } from 'react';
import FeatureCards from '../featurecards/FeatureCards';
import QuizBox from '../quiz/Quiz';

export default class Homepage extends Component {
  render () {
    return (
      <div>
        <h1>Welcome!!</h1>
        <FeatureCards />
        <QuizBox/>

        BELOW QUIZ BOX!!
      </div>
    );
  }
}