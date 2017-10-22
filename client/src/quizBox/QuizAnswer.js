import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';

export default class QuizAnswer extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log("running!");
    let myObj = this.props.getScores(); 
    console.log(myObj);
    document.getElementById("quiz-answer-block").style.display = 'block';
    
  }
  componentDidMount() {
    document.getElementById("quiz-answer-block").style.display = 'none';
  }
  render () {
    let htmlQuizQ = [];
    let thisAnswer = '';
    ;
    this.props.data.forEach(function(element, index) {
       
      thisAnswer = element.question;
         

      element.options.forEach((e, i)=> { 
        if (element.scores[i] > 0) {
          let result = e  + " (" + element.scores[i] + " point)";
          let extraInfo = '';
          if (element.info) {
            extraInfo = <blockquote>{element.info}</blockquote>;
          }
          // thisAnswer += "<strong>" + result + "</strong>";
          htmlQuizQ.push(<li><span className='answerQ'>{thisAnswer}: <strong>{result}</strong></span>{extraInfo}</li>); 
        }
        
      });

    });
    
  
    return (
      <div>
        <Button onClick={this.handleClick}> Show Answers </Button>
        <div id="quiz-answer-block" className="quiz-answer-block">
          <h3>Answers</h3>
          <ul>
            {htmlQuizQ}
          </ul>
        </div>
      </div>
    );
  }
}