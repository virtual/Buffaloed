import React, { Component } from 'react';

export default class QuizOption extends Component {
  constructor() {
    super();
  }
  render () {
    let setName = "question" + this.props.index;
    return (
      <label><input name={setName} type="radio" /> {this.props.e}</label> 
    );
  }
}