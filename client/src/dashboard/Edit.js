import React, { Component } from 'react';
import EditForm from './EditForm';
import { Link } from 'react-router-dom';
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
    var url = '/sight/'+this.slug;
    axios.get(url, { 
    }).then((sightObj) => { 
      if (sightObj.data !== undefined) { 
        this.setState({ 
          initialized: true,
          sight: sightObj.data
        });
      }  else {
        console.log('undefined');
      }
    });
  }

  render () {
    if (this.state.initialized) { 
      let allInfo = this.state.sight.sightData[0];
      return (
        <div> 
          <Link to='/admin'>Back to Admin Dashboard</Link>
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