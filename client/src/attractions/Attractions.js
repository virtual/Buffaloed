import React, { Component } from 'react';
import CheckBox from './Checkbox';
import StartButton from './Button';
import FeatureMap from './Map';
import Leaderboard from './Leaderboard';
import FeatureCards from '../featurecards/FeatureCards';
import QuizBox from '../quiz/Quiz';
export default class Attractions extends Component {
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