import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';
import ModalBox from './QuizModal';

export default class QuizAnswer extends Component {
  constructor() {
    super();
    let disabled = false;
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log("running!");
    //this.disabled = true;
    let myObj = this.props.getScores(); 
    console.log(myObj);
    console.log(myObj.length);
    if(myObj.length < 4) {
      //this.props.handleOpen();
      alert("You haven't answered all the questions yet");
    } else {
      document.getElementById("quiz-answer-block").style.display = 'block';
    }
    
    
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
    
    let currentScores = 0;
    let numAnswered = this.props.getScores().length;
    let percentCorrect = 0;
    if(numAnswered > 0) {
      currentScores = this.props.getScores().reduce((a, b)=>{
      return a + b;
      }, 0);
      percentCorrect = (100 * currentScores / numAnswered).toFixed(2); 
    }
    
    console.log('scores');
    console.log(currentScores);
  
    return (
      <div>
        <ModalBox handleClick={this.handleClick} />
        {/* <Button disabled={this.disabled} onClick={this.handleClick}> Show Answers </Button> */}
        <div id="quiz-answer-block" className="quiz-answer-block">
          <h3>Answers</h3>
          <p>You scored {percentCorrect}%, {currentScores} out of {numAnswered} correct</p>
          <ul>
            {htmlQuizQ}
          </ul>
        </div>
      </div>
    );
  }
}