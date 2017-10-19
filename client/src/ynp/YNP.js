import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
let config = require('../config');


export default class YNP extends React.Component {
  constructor () {
    super();
    this.state = {
      initialized: false,
      ynpData: {}
    };
    this.fetchYellowstoneData = this.fetchYellowstoneData.bind(this);
  }
  fetchYellowstoneData (city) {
    console.log(city);
    this.setState({
      initialized: false
    });
    // wrap your
    // logic fetching all the weather api data into a method.
    var apikey = config.key;
    var parkName = "yell";
    var url = 'https://developer.nps.gov/api/v1/parks?parkCode=' + parkName + 
    '&fields=images,contacts,entranceFees,entrancePasses,operatingHours'+
    '&api_key=' + apikey;
    console.log(url);
    fetch(url).then(function (response) {
      return response.json();
    }).then((ynpObj) => {
      if (ynpObj !== undefined) {
        this.setState({
          initialized: true,
          ynpData: ynpObj
        });
      } else {
        this.fetchYellowstoneData();
      }
    });
  }
  componentDidMount () {
    this.fetchYellowstoneData();
  }
  render () {
    let costHTML = [];
    if (this.state.initialized) {
      console.log(this.state.ynpData)
      //console.log(this.state.ynpData.data["0"].entranceFees["0"].cost);
      
      this.state.ynpData.data["0"].entranceFees.forEach((e)=> {
       console.log(e);
       let costConverted = "$" + e.cost.toFixed(2);
       costHTML.push(<p><strong>{e.title} - {costConverted}</strong> <br/>{e.description}</p>); 
      });
      return (
        <div>
         {costHTML}
        </div>
      );
    } else {
      return (
        <h2>
          Loading...
        </h2>
      );
    }
  }
} 