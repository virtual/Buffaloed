import React, { Component } from 'react';
import QuizOption from './QuizOption';

export default class QuizQuestion extends Component {
  constructor() {
    super();
    this.state = {
      questionsLoaded: false,
      htmlQuizQ: []
    }
  }
  render () {

    if (!(this.state.questionsLoaded)) { 

    // let htmlQuizQ = [];
    let monElemente = this.props.element;

      function shuffle(obj1, obj2) {
        var index = obj1.length;
        var rnd, tmp1, tmp2;
      
        while (index) {
          rnd = Math.floor(Math.random() * index);
          index -= 1;
          tmp1 = obj1[index];
          tmp2 = obj2[index];
          obj1[index] = obj1[rnd];
          obj2[index] = obj2[rnd];
          obj1[rnd] = tmp1;
          obj2[rnd] = tmp2;
        }
      }
      shuffle(monElemente.options, monElemente.scores);

      monElemente.options.forEach((e, i)=> {
        this.state.htmlQuizQ.push(<QuizOption setScores={this.props.setScores} e={e} val={monElemente.scores[i]} index={this.props.index} />);
      });

      this.setState( {
        questionsLoaded: true
      })
    }

    return (
      <div>
        <p>{this.props.element.question}</p>
        {this.state.htmlQuizQ} 
      </div>
    );
  }
}