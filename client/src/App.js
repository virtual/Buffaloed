import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './login/Login';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
          <Route path="/login" render={()=> <Login /> }/>
         </div>
         </Router>
      </div>
    );
  }
}

export default App;
