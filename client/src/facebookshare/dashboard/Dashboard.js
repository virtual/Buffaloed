import React, { Component } from 'react';
import ImgUploader from '../imageuploader/ImageUploader'
let axios = require('axios');


export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      initialized: false 
    }
    console.log(JSON.parse(sessionStorage.getItem('user')));     
  }

  componentDidMount(){
    this.props.getUser(); 
    console.log(this.props.user);

    // rudimentary redirect, needs to be updated to be seamless
    if (!(JSON.parse(sessionStorage.getItem('user')))) {
      window.location.href = "/login";
    }

  }
  render () {
    let user = this.props.user; 
    let imgLink = "/img/avatars/default.png";
    if (user.img) {
    imgLink = "/img/avatars/" + user.img;
    }
    return (
      <div>
        <ImgUploader />
        <h1>Dashboard</h1>
        <h2>Welcome, {user.firstName} {user.lastName} </h2>
          <img src={imgLink} />
        <p><strong>Settings: </strong><br/>
        Email: {user.email}  
        </p>
      </div>
    );
  }
}