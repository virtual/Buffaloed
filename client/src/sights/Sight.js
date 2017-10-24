import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import FeatureMap from './Map';
import QuizContainer from '../quizBox/QuizContainer';
const axios = require('axios');

export default class Sight extends Component {
  constructor(){
    super();
    this.state = {
      initialized: false,
      initializedScores: false,
      sight: [],
      scores: {}
    }
    this.slug = undefined;
    this.fetchSight = this.fetchSight.bind(this);
    this.fetchScores = this.fetchScores.bind(this);
    this.saveScores = this.saveScores.bind(this);
    this.getSlug = this.getSlug.bind(this);
  }
  componentDidMount() {
    this.getSlug();
    this.fetchSight();
    this.fetchScores();
  }

  getSlug() {
    let sluggyPath = window.location.pathname;
    let sluggyReg = /(sight\/)([\w\-]+)/; 

    if (!(sluggyPath.match(sluggyReg))) {  
      window.location.replace("/sights");
    }

    var found = sluggyPath.match(sluggyReg)[2];
    this.slug = found; // dont use state cuz it won't set
  }

  fetchSight() {
    var url = '/sightsInfo';
    fetch(url, {
      method: "post",
      headers:{"Content-Type":"application/json"}, 
      body: JSON.stringify({ 
        slug: this.slug
      })
    }).then(function (response) {
      
      return response.json();
    }).then((sightObj) => { 
      if (sightObj !== undefined) { 
        this.setState({ 
          initialized: true,
          sight: sightObj
        });
      }  else {
        console.log('undefined');
      }
    });
  }

  saveScores(myScoreObj) {
    console.log("saving score!");
    axios.post('/score', myScoreObj) 
  }

  fetchScores() {
    var url = '/scoreInfo';
    fetch(url, {
      method: "post",
      headers:{"Content-Type":"application/json"}, 
      body: JSON.stringify({ 
        slug: this.slug
      })
    }).then(function (response) {
      
      return response.json();
    }).then((scoresObj) => { 
      if (scoresObj !== undefined) { 
        this.setState({ 
          initializedScores: true,
          scores: scoresObj
        });
        console.log(this.state)
      }  else {
        console.log('undefined');
      }
    });
  }
  render () {
    if (this.state.initialized) { 
      console.log(this.state.sight.sightData[0]);

      if (this.state.initializedScores) { 
        console.log(this.state.scoresObj);
      }
      let allInfo = this.state.sight.sightData[0];
      let img = '/img/sights/orig/' + allInfo.img;
      return (
        <div> 
          <h1>
          {allInfo.name}
          </h1>
 
        

  <Grid>
    <Grid.Column computer={4} mobile={16} tablet={6}>
      <Image src={img} alt={allInfo.name} />
    </Grid.Column>
    <Grid.Column computer={6} mobile={16} tablet={10}>
    <p>{allInfo.desc}</p>
     </Grid.Column>
      <Grid.Column computer={6} mobile={16} tablet={16}>
   <FeatureMap sightName={allInfo.name} lat={allInfo.lat} lng={allInfo.lng} />
    </Grid.Column>
    <Grid.Column computer={16} mobile={16} tablet={16}>
   <QuizContainer sight={allInfo.slug} saveScores={this.saveScores}/>
    </Grid.Column>
  </Grid>

       </div>
      );
    } else {
      return(
      <div>Loading...</div>
    )
    }
    
  }
}