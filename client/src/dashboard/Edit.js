import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import EditForm from './EditForm';
const axios = require('axios');

export default class Edit extends Component {
  constructor(){
    super();
    this.state = {
      initialized: false,
      sight: []
    }
    this.slug = undefined;
    this.fetchSight = this.fetchSight.bind(this);
    this.getSlug = this.getSlug.bind(this);
  }
  componentDidMount() {
    this.getSlug();
    this.fetchSight();
    this.setState({user: this.props.getUser});
    this.props.getUser();
    console.log(this.props.user);

  }

  getSlug() {
    let sluggyPath = window.location.pathname;
    let sluggyReg = /(edit\/)([\w\-]+)/; 

    if (!(sluggyPath.match(sluggyReg))) {  
      window.location.replace("/admin");
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

  saveSights(mySightObj) {
    console.log("saving sight!");
    axios.post('/saveSight', mySightObj) 
  }

   
  render () {
    if (this.state.initialized) { 
      console.log(this.state.sight.sightData[0]);

 
      let allInfo = this.state.sight.sightData[0];
      let img = '/img/sights/orig/' + allInfo.img;
      return (
        <div> 
        
 
        <EditForm info={allInfo} slug={this.slug}/> 
       </div>
      );
    } else {
      return(
      <div>Loading...</div>
    )
    }
    
  }
}