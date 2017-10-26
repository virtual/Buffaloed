import React, { Component } from 'react';

export default class Logout extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log(this.props.user);

    if (this.props.user.firstName) {
      
      sessionStorage.removeItem('user');
      let loggedOutUser={
        firstName: '', 
        lastName: '',
        email: '',
        id: '',
        img: ''
      }
      this.props.setUser(
        loggedOutUser
      );
    }
  
  }
  render () {
    return (
      <div><p>You have logged out.</p></div>
    );
  }
}