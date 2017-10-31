import React, { Component } from 'react';

export default class QuizOption extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      answeredClass: ''
    }
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleSelect(event) { 
    var radioName = event.target.name; //Get radio name
    document.getElementsByName(radioName).forEach((radio)=>{
      radio.setAttribute("disabled", "disabled");
    }); 
  
    this.props.setLocalScores( parseInt(event.target.value, 10) ); //radix
    this.props.changeToAnswered();

    if (event.target.value === "1") { 
      this.setState({
        answeredClass: 'woo'
      });
    } else {
      this.setState({
        answeredClass: 'boo'
      });
    }
  }
  render () {
    let setName = "question" + this.props.index;
    return (
      <label className={this.state.answeredClass}><input onChange={this.handleSelect} name={setName} value={this.props.val} type="radio" /> {this.props.e}</label> 
    );
  }
}