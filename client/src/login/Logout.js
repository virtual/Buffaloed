import React, { Component } from 'react';
const axios = require('axios');

export default class Logout extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout() {
    axios.get('/logout').then((res)=> {
      console.log(res);
      if (res !== undefined) { 
        console.log(res.data);
        
      }  else {
        console.log('undefined');
      }
    }, function(err){
      console.log(err);
    });
   
  }
  componentDidMount() {
    this.logout();
    console.log(this.props.user);

    if (this.props.user.firstName) {
      
      sessionStorage.removeItem('user');
      let loggedOutUser={
        firstName: '',
        lastName: '',
        email: '',
        id: null,
        img: null
      }
      this.props.setUser(
        loggedOutUser
      );
    }
    console.log(this.props.user);
    
  }
  render () {
    return (
      <div><p>You have logged out.</p></div>
    );
  }
}