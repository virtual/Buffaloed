import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react'

export default class Navbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu icon stackable>
          <Link className="item" to="/"> 
          <Icon bordered inverted color='blue' name='globe' />GetBuffaloed!</Link>
          <Link className="item" to="/about">About</Link>
          <Link className="item" to="/sights">Sights</Link>
          <Link className="item" to="/quiz">Quiz</Link>
         
          <Menu.Menu position='right'>
            {/* show user dashboard & logout */}

            {/* if not logged in show these: */}
            <Link className="item" to="/login">Login</Link>            
            <Link className="item" to="/signup">Signup</Link>            
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}