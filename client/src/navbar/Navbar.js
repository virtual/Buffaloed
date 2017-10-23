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
    let first = (this.state.user) ? this.state.user.firstName : '';
    return (
      <div>
        <Menu icon stackable> 
          <Link className="item" to="/"> 
        <Image src='/img/logowhite.png' size='small'/>        
          </Link>
          <Link className="item" to="/about">About</Link>
          <Link className="item" to="/sights">Sights</Link>
          <Link className="item" to="/quiz">Quiz</Link>
         
          <Menu.Menu position='right'>
            {/* show user dashboard & logout */}

            {/* if not logged in show these: */}
            <Link className="item" to="/dashboard">{first} Dashboard</Link>            
            <Link className="item" to="/login">Login</Link>            
            <Link className="item" to="/signup">Signup</Link>            
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}