import React, { Component } from 'react';
import './App.css';
import Login from './login/Login';
import Homepage from './homepage/Homepage';
import Navbar from './navbar/Navbar';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import SignUp from './signup/SignUp';
import { Container } from 'semantic-ui-react';
import Sights from './sights/Sights'; 
import Sight from './sights/Sight'; 
import Footer from './footer/Footer';
import ContactInfo from './contactinfo/ContactInfo';
import QuizBox from './quiz/Quiz';
import About from './about/About';
import Dashboard from './dashboard/Dashboard';
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
    axios.get('/user').then((res)=> {
      console.log(res);
      if (res !== undefined) { 
        console.log('update state');
        console.log(res.data);
        this.setState({ 
          user: res.data
        });
      }  else {
        console.log('undefined');
      }
    }, function(err){
      console.log(err);
    });
  };

  // componentDidMount() {
    // axios.post('/score', {
    //   slug: 'lamar-valley',
    //   leaderboard: {
    //     email: 'woo.com',
    //     score: 2
    //   }
    // }) 
  // }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar getUser={this.getUser} />
            <Container>
            <Route exact path="/" render={()=> <Homepage /> }/>
            <Route path='/sights' render={()=> <Sights /> }/>
            <Route path='/sight' render={()=> <Sight /> }/>
            <Route path="/login" render={()=> <Login setUser={this.setUser}  /> }/>
            <Route path="/signup" render={()=> <SignUp setUser={this.setUser}  /> }/>
            <Route path="/dashboard" render={()=> <Dashboard user={this.state.user} getUser={this.getUser} setUser={this.setUser}  /> }/>
            <Route path='/contactinfo' render={()=> <ContactInfo /> }/>
            <Route path='/quiz' render={()=> <QuizBox /> }/>
            <Route path='/about' render={()=> <About /> }/>
            </Container>
            <Footer />
         </div>
         </Router>
         
      </div>
    );
  }
}

export default App;
