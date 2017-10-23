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
    axios.get('/sights').then((res)=> {
      console.log(res);
      if (res !== undefined) { 
        this.setState({ 
          sights: res.data
        });
      }  else {
        console.log('undefined');
      }
    });
  }

  componentDidMount(){
    this.getList();
    this.props.getUser();
    console.log("MEW!");
    console.log(this.props.user);

  }
  render () {
    let user = this.props.user; 
    return (
      <div>

        <h1>Dashboard</h1>
        <h2>Welcome, {user.firstName} {user.lastName} </h2>
        <p><strong>Settings: </strong><br/>
        Email! {user.email}
        </p>
      </div>
    );
  }
}