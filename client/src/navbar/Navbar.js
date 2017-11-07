import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';

var Navbar = observer(class Navbar extends Component {
  constructor() {
    super();
    this.state = { 
      activeItem: 'home' 
    } 
  } 

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    let entryLinks = [];
    
    if (this.props.userStore.user) {
      let first = (this.props.userStore.user) ? this.props.userStore.user.firstName : ''; // ternary operator
      let img = (this.props.userStore.user) ? '/img/avatars/' + this.props.userStore.user.img : '/img/avatars/deer.png'; 
      entryLinks.push(<Link className="item" key='linkDashboard' to="/dashboard"><Image avatar size="mini" src={img}/> {first}</Link>);
      entryLinks.push(<Link className="item" key='linkLogout' to="/logout">Logout</Link>);
    } else {
      entryLinks.push(<Link className="item" key='linkLogin' to="/login">Login</Link>);
      entryLinks.push(<Link className="item" key='linkSignup' to="/signup">Signup</Link>);
    }

    return (
      <div>
        <Menu icon stackable> 
          <Link className="item" to="/"> 
        <Image alt='Yellowstone Odyssey' src='/img/logo-transparent.png' size='small'/>        
          </Link>
          <Link className="item" to="/about">About</Link>
          <Link className="item" to="/sights">Sights</Link>
         
          <Menu.Menu position='right'>
            
            {/* show user dashboard & logout */}
            {entryLinks}
            {/* if not logged in show these: */}
                     
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
});

export default inject("userStore")(Navbar);