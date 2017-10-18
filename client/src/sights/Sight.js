import React, { Component } from 'react';

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
      console.log(this.state);
      return (
        <div> 
          <h1>
          {this.state.sight.sightData["0"].name}
          </h1>
        </div>
      );
    } else {
      return(
      <div>Loading...</div>
    )
    }
    
  }
}