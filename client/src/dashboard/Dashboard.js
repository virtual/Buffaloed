import React, { Component } from 'react';
let axios = require('axios');


export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      initialized: false,
      sights: []
    }
    this.getList = this.getList.bind(this);
  }


  getList() {
    var url = '/sights';

    axios.get('/sights').then((sightObj)=> {
      if (sightObj !== undefined) { 
        this.setState({ 
          sights : sightObj.data
        });
      }  else {
        console.log('undefined');
      }
    });
  }

  componentWillMount(){
    this.getList();
  }
  render () {
    console.log('mew')
    console.log(this.state.sights);
    let html = [];
    this.state.sights.forEach(function(e) {
      html.push(<p>{e.name}</p>); 
    }, this);
    return (
      <div>
        <h1>Dashboard</h1>
        {html} 
        {typeof(this.state)}
cookie parser?
      </div>
    );
  }
}