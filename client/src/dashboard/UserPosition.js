import React, { Component } from 'react';
import FeatureMap from '../sights/Map';
import { Link } from 'react-router-dom';
import { Divider, Image, Item, Icon } from 'semantic-ui-react'
let axios = require('axios');
var haversine = require('haversine')

export default class UserPosition extends Component {
  constructor(){
    super();
    this.state = {
      initialized: false,
      sightInit: false,
      start : {
        latitude: 30.849635,
        longitude: -83.24559
      },
      sights: [],
      sight: {}
    }

    this.geoFindMe = this.geoFindMe.bind(this);
    this.loadPoints = this.loadPoints.bind(this);
    this.fetchSights = this.fetchSights.bind(this);
  }

  componentDidMount(){ 
    if(!(this.state.initialized)) {
      this.fetchSights();
    if ("geolocation" in navigator) {
      /* geolocation is available */
        this.geoFindMe();
      
    
    } else {
      /* geolocation IS NOT available */
    }
  } else {
    // this.loadPoints()
    // this.getClosest();
  }
   
  }

  geoFindMe() {
    navigator.geolocation.getCurrentPosition((position) => { 
      this.setState({
        initialized: true, 
        start: 
          { longitude: parseFloat(position.coords.longitude), 
            latitude: parseFloat(position.coords.latitude) } 
        });
      }, (error) => {
          alert(JSON.stringify(error))
      }, {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000
      });
     
  } 

   

  fetchSights() {
    var url = '/sights';
    axios.get(url, { 
    }).then((sightsObj) => { 
      if (sightsObj.data !== undefined) { 
        this.setState({  
          sights: sightsObj.data
        });
      }  else {
        console.log('undefined');
      }
    });
  }

  getClosest() { 
    let pts = [];
    let closest = {};
    this.state.sights.forEach((e) => {
      pts.push({ slug: e.slug, harv: parseFloat(this.loadPoints(e.lat, e.lng), 10)});
    });
  
    var lowest = Number.POSITIVE_INFINITY; 
    var tmp;
    for (var i=pts.length-1; i>=0; i--) {
      tmp = pts[i].harv;
      if (tmp < lowest) {
        lowest = tmp; 
        closest = { slug: pts[i].slug, harv: tmp }
      }
    }
    return closest.slug;
  }

  loadPoints(elat, elng) { 
    let start = {latitude: this.state.start.latitude, longitude: this.state.start.longitude};
    let end = {latitude: elat, longitude: elng};
    
    return (haversine(start, end, {unit: 'mile'}));
  }

  fetchSight(slug) {
    var url = '/sight/'+slug;
    axios.get(url, { 
    }).then((sightObj) => { 
      if (sightObj.data !== undefined) { 
        this.setState({  
          sight: sightObj.data,
          sightInit: true
        });
      }  else {
        console.log('undefined');
      }
    });
  }

  render() { 
    let end = {
      latitude: 27.950575,
      longitude: -82.457178
    }
    
    if (this.state.initialized) {
      if (!(this.state.sightInit)){
        this.fetchSight(this.getClosest());
      }
    }
    if ((this.state.initialized) && ((this.state.sightInit))){
      let cSight = this.state.sight.sightData[0];
      let cImg = "/img/sights/" + cSight.img;
      let cLink = "/sight/" + cSight.slug;
      return (
        <div className="ui userposition card"> 
          <div className="content">
          <h3>Your Location:</h3>
          <FeatureMap sightName="Your location" lat={this.state.start.latitude} lng={this.state.start.longitude} /> 
         <Divider/>
          <h3>Nearest Sight:</h3>
         
          <Item.Group divided>
            <Item as={Link} to={cLink}>
              <Item.Image size='tiny' src={cImg} />
              <Item.Content verticalAlign='middle'><strong>{cSight.name}</strong>
                  <Item.Extra>
              <Icon name='map signs' /> {(this.loadPoints(cSight.lat, cSight.lng)).toFixed(2)} miles away
            </Item.Extra>
        </Item.Content>
            </Item>
    
         </Item.Group>
         </div>
        </div>
      );
  } else {
    return(
      <div></div>
      )
    }
  }
}

