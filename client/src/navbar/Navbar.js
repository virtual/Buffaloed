import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react'

export default class Navbar extends Component {
  state = { 
    activeItem: 'home' 
  } 

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount() {
    this.props.getUser();
  }
  render() {
    const { activeItem } = this.state
    let first = (this.props.user.firstName) ? this.props.user.firstName : '';
    let img = (this.props.user.img) ? '/img/avatars/' + this.props.user.img : '/img/avatars/deer.png'; 
    let entryLinks = [];
    
    if (this.props.user.firstName) {
      console.log("this user");
      console.log(this.props.user)
      entryLinks.push(<Link className="item" to="/dashboard"><Image avatar size="mini" src={img}/> {first}</Link>);
      entryLinks.push(<Link className="item" to="/logout">Logout</Link>);
    } else {
      entryLinks.push(<Link className="item" to="/login">Login</Link>);
      entryLinks.push(<Link className="item" to="/signup">Signup</Link>);
    }

    return (
      <div>
        <Menu icon stackable> 
          <Link className="item" to="/"> 
        <Image alt='Yellowstone Odyssey' src='/img/logowhite.png' size='small'/>        
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
}