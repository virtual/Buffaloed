import React, { Component } from 'react';
let axios = require('axios');

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      initialized: false,
      user: {}
    }
    //console.log(JSON.parse(sessionStorage.getItem('user')));     
  }

  componentWillMount() {
    this.props.getUser().then((data)=>{
      console.log(data);
      if (data.email) { // if data returns user object instead of error
        this.setState({
          user: data,
          initialized: true
        })
      console.log("logged in!");
      
      } else {
        console.log("not logged")
         
          window.location.href = "/login"; 
      }
    }, (err)=>{
      //do stuff with err
      console.log(err);
    }) 
  }
  
  render () {
    let imgLink = "/img/avatars/default.png";
    if (this.state.user.img) {
    imgLink = "/img/avatars/" + this.state.user.img;
    }
    let adminBtn = ""
    if (this.state.initialized) {
      if (this.state.user.role === 'admin'){
        adminBtn = <a className="button primary ui " href="/admin">Edit Sights</a>
        console.log('admin')
      }
    }
    if (this.state.initialized) {
      return (
        <div>
          <h1>Dashboard</h1>
          <h2>Welcome, {this.state.user.firstName} {this.state.user.lastName} </h2>
            <img src={imgLink} />
          <p><strong>Settings: </strong><br/>
          Email: {this.state.user.email}  
          </p>
          {adminBtn}
        </div>
      );
    } else {
      return (
        <div><p>Not logged in!</p>
          </div>
      )
    }
  }
}