import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './login/Login';
import Homepage from './homepage/Homepage';
import Navbar from './navbar/Navbar';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import SignUp from './signup/SignUp';
import { Container } from 'semantic-ui-react';
import Attractions from './attractions/Attractions'; 
import FeatureMap from './attractions/Map';
import Leaderboard from './attractions/Leaderboard'; 


class App extends Component {
  constructor(){
    super();
    this.state = {
      user: {firstName: '', lastName: '', email: ''},
      poiID: { slug: '' }
    }
    this.setUser = this.setUser.bind(this);
  }
  setUser(user){
    this.setState({
      user: user
    })
  };

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar />
            <Container>
              
            <Route exact path="/" render={()=> <Homepage /> }/>
            <Route path='/attractions' render={()=> <Attractions /> }/>
            <Route path="/login" render={()=> <Login setUser={this.setUser}  /> }/>
            <Route path="/signup" render={()=> <SignUp setUser={this.setUser}  /> }/>
            </Container>
         </div>
         </Router>
      </div>
    );
  }
}

export default App;
