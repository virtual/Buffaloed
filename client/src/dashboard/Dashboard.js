import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UserPosition from './UserPosition';
import { inject, observer } from 'mobx-react';

var Dashboard = observer(class Dashboard extends Component {
  constructor() {
    super();
   }

  componentWillMount() {
    if (!(this.props.userStore.user)) {
      window.location.href = "/login";       
    }
  }

   render () {
    let imgLink = "/img/avatars/default.png";
    if (this.props.userStore.user) {
      imgLink = "/img/avatars/" + this.props.userStore.user.img;
    }
    let adminBtn = ""
    if (this.props.userStore.user) {
      if (this.props.userStore.user.role === 'admin'){
        adminBtn = <Link className="button primary ui " to="/admin">Edit Sights</Link>
        console.log('admin')
      }
    }
    if (this.props.userStore.user) {
      return (
        <div>
          <style>{`
      .userposition .leaflet-container {
        height: 200px !important; width: 100%; 
    }
    `}</style>

          <Grid>
            <Grid.Column computer={8} mobile={16} tablet={8}>
              <h1>Dashboard</h1>
              <h2>Welcome, {this.props.userStore.user.firstName} {this.props.userStore.user.lastName} </h2>
                <img alt={this.props.userStore.user.firstName} src={imgLink} />
              <p><strong>Settings: </strong><br/>
              Email: {this.props.userStore.user.email}  
              </p>
              {adminBtn} 
            </Grid.Column>
            <Grid.Column computer={8} mobile={16} tablet={8}>
              <UserPosition />    
            </Grid.Column>
          </Grid> 
        </div>
      );
    } else {
      return (
        <div>
          <p>Not logged in!</p>
        </div>
      )
    }
  }
});
export default inject("userStore")(Dashboard);