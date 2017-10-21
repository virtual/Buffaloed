import React, { Component } from 'react';
import QuizOption from './QuizOption';

export default class QuizQuestion extends Component {
  constructor() {
    super();
  }
  render () {
    let htmlQuizQ = [];
    this.props.element.options.forEach((e, i)=> {
      htmlQuizQ.push(<QuizOption e={e} index={this.props.index} />);
    });
    return (
      <div>
        <p>{this.props.element.question}</p>
        {htmlQuizQ}
        <hr/>
      </div>
    );
  }
}