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
    axios.get('/sights', {withCredentials: true}).then((sightObj)=> {

      if (sightObj !== undefined) { 
        this.setState({ 
          sights : sightObj.data
        });
      }  else {
        console.log('undefined');
      }
    });
  }

  componentDidMount(){
    this.getList();
  }
  render () {
    let html = [];
    this.state.sights.forEach(function(e, i) {
      html.push(<p key={i}>{e.name}</p>); 
    }, this);
    return (
      <div>
        <h1>Dashboard</h1>
        {html} 
      </div>
    );
  }
}