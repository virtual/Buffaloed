import React, { Component } from 'react';

export default class QuizOption extends Component {
  constructor() {
    super();
    this.state = {
      value: 0 
    }
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleSelect(event) {
    // let label = "q"+this.props.index;
    // this.props.setScores({label: event.target.value});
    // this.props.setScores( "q"+this.props.index, event.target.value)
    
    var radioName = event.target.name; //Get radio name
    document.getElementsByName(radioName).forEach((radio)=>{
      radio.setAttribute("disabled", "disabled");
    });
       var stateObject = function() {
        let returnObj = {};
        returnObj[this.target.name] = this.target.value;
           return returnObj;
      }.bind(event)();
  
      this.props.setScores( stateObject );    
   

  }
  render () {
    let setName = "question" + this.props.index;
    return (
      <label><input onChange={this.handleSelect} name={setName} value={this.props.val} type="radio" /> {this.props.e}</label> 
    );
  }
}