import React, { Component } from 'react';
const axios = require('axios');

export default class YNP extends Component {
  constructor () {
    super();
    this.state = {
      initialized: false,
      ynpData: {}
    };
    this.fetchYellowstoneData = this.fetchYellowstoneData.bind(this);
  }
  fetchYellowstoneData () {
    this.setState({
      initialized: false
    });
    
    // wrap your
    // logic fetching all the weather api data into a method.
    var manualJSON = '/json/ynp.json';

    axios.get(
      // url, {"Access-Control-Allow-Origin": "*"},
      manualJSON
    ).then( (res)=> {
      console.log(res.status);
      if (res) { 
        this.setState({
          initialized: true,
          ynpData: res.data
        });
      } else {
        this.fetchYellowstoneData();
      }
    }, function(e){
      console.log(e)
    });
  }

  componentDidMount () {
    this.fetchYellowstoneData();
  }
  render () {
    let costHTML = [];
    if (this.state.initialized) {      
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
        <p>
          Loading...
        </p>
      );
    }
  }
} 