import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import CheckBox from './Checkbox';
import StartButton from './Button';
import FeatureMap from './Map';
import Leaderboard from './Leaderboard';
import FeatureCards from '../featurecards/FeatureCards';
import QuizBox from '../quiz/Quiz';
import Footer from '../footer/Footer';
export default class Sights extends Component {
  constructor(){
    super();
    
  }

  componentDidMount(){
    // this.fetchSights();
    
  }

  // fetchSights() {
  //   //var url = '/Sight/' + this.props.slug;
  //   var url = '/sight/old-faithful';
  //   fetch(url).then(function (response) {
  //     return response.json();
  //   }).then((sightObj) => {
  //     if (sightObj !== undefined) { 
  //       console.log(sightObj);
  //       this.setState({ 
  //         sightName : sightObj.sightData["0"].name
  //       });
  //       console.log(this.state.sightName);
  //     }  else {
  //       console.log('undefined');
  //     }
  //   });
  // }
  render () { 
    return (
      <div>
        <h1>Sights</h1>
        {/* <QuizBox/> */}
        <FeatureCards />
        {/*<CheckBox />
        <StartButton />*/}
        <FeatureMap />
      </div>
      
    );
  }
}