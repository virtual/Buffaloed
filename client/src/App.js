import React, { Component } from 'react';
import './App.css';
import Login from './login/Login';
import Logout from './login/Logout';
import Homepage from './homepage/Homepage';
import Navbar from './navbar/Navbar';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import SignUp from './signup/SignUp';
import { Container } from 'semantic-ui-react';
import Sights from './sights/Sights'; 
import Sight from './sights/Sight'; 
import Admin from './dashboard/Admin'; 
import Edit from './dashboard/Edit';
import AddForm from './dashboard/AddForm'
import Footer from './footer/Footer';
import ContactInfo from './contactinfo/ContactInfo';
import About from './about/About';
import Dashboard from './dashboard/Dashboard';
import UserStore from './stores/UserStore';
import SightStore from './stores/SightStore';
import {Provider} from 'mobx-react';
const axios = require('axios');

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: {firstName: '', lastName: '', email: ''},
      sightID: { slug: '' }
    }
    this.setUser = this.setUser.bind(this);
    this.getUser = this.getUser.bind(this);
  }
  setUser(user){
    this.setState({
      user: user
    })
  };
  getUser(){
    return new Promise((resolve, reject)=> {
      axios.get('/user').then((res)=> {
        if (res !== undefined) { 
          resolve(res.data);
          this.setState({ 
            user: res.data
          });
        }  else {
          reject("undefined");
        }
      }, function(err){
        reject(err);
      });
    });
  };


  render() {
    return ( 
    <Provider userStore={new UserStore()} sightStore={new SightStore()}>
      <div className="App">
        <Router>
          <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Navbar />
            <Container style={{flex: 1}}>
            <Route exact path="/" render={()=> <Homepage /> }/>
            <Route path='/sights' render={()=> <Sights /> }/>
            <Route path='/sight/:slug' render={()=> <Sight getUser={this.getUser} /> }/>
            <Route path="/login" render={()=> <Login /> }/>
            <Route path="/logout" render={()=> <Logout   /> }/>
            <Route path="/signup" render={()=> <SignUp /> }/>
            <Route path="/dashboard" render={()=> <Dashboard /> }/>
            <Route path="/admin" render={()=> <Admin  getUser={this.getUser} /> }/>
            <Route path="/edit/:slug" render={()=> <Edit  getUser={this.getUser} /> }/>
            <Route path='/contactinfo' render={()=> <ContactInfo /> }/>
            <Route path='/about' render={()=> <About /> }/>
            <Route path='/add' render={()=> <AddForm getUser={this.getUser} /> }/>
            </Container>
            <Footer />
         </div>
        </Router>     
      </div>
    </Provider>
    );
  }
}

export default App;
