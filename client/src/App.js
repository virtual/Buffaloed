import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './login/Login';
import Homepage from './homepage/Homepage';
import Navbar from './navbar/Navbar';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import SignUp from './signup/SignUp';
import { Container } from 'semantic-ui-react';
import Sights from './sights/Sights'; 
import FeatureMap from './sights/Map';
import Leaderboard from './sights/Leaderboard'; 
import Footer from './footer/Footer';
import ContactInfo from './contactinfo/ContactInfo';


class App extends Component {
  constructor(){
    super();
    this.state = {
      user: {firstName: '', lastName: '', email: ''},
      sightID: { slug: '' }
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
            <Route path='/sights' render={()=> <Sights /> }/>
            <Route path="/login" render={()=> <Login setUser={this.setUser}  /> }/>
            <Route path="/signup" render={()=> <SignUp setUser={this.setUser}  /> }/>
            <Route path='/contactinfo' render={()=> <ContactInfo /> }/>
            </Container>
            <Footer />
         </div>
         </Router>
      </div>
    );
  }
}

export default App;
