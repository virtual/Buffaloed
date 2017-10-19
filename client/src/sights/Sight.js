import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import FeatureMap from './Map';

export default class Site extends Component {
  constructor(){
    super();
    this.fetchSight = this.fetchSight.bind(this);
    this.state = {
      initialized: false,
      sight: [] 
    }

  }
  componentWillMount() {
    this.fetchSight();
  }
  fetchSight() {
    let sluggyPath = window.location.pathname;
    let sluggyReg = /(sight\/)([\w\-]+)/; 

    if (!(sluggyPath.match(sluggyReg))) {  
      window.location.replace("/sights");
    }

    var found = sluggyPath.match(sluggyReg)[2];
    var url = '/sightsInfo';
  
    fetch(url, {
      method: "post",
      headers:{"Content-Type":"application/json"}, 
      body: JSON.stringify({ 
        slug: found
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
  render () {
    if (this.state.initialized) { 
      console.log(this.state.sight.sightData[0]);
      let allInfo = this.state.sight.sightData[0];
      return (
        <div> 
          <h1>
          {allInfo.name}
          </h1>
 
        

  <Grid>
    <Grid.Column computer={4} mobile={16} tablet={10}>
      <Image src={allInfo.img} alt={allInfo.name} />
    </Grid.Column>
    <Grid.Column computer={9} mobile={16} tablet={6}>
   <p>{allInfo.desc}</p>
   <FeatureMap lat={allInfo.lat} lng={allInfo.lng} />
    </Grid.Column>
    <Grid.Column computer={3} mobile={16} tablet={16}>
      hi!
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