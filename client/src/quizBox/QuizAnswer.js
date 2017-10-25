import React, { Component } from 'react';
import ModalBox from './QuizModal';
import {Button, Icon} from 'semantic-ui-react';
import FacebookShare from '../facebookshare/FacebookShare'

export default class QuizAnswer extends Component {
  constructor() {
    super();

    
    this.state = {
      numAnswered: undefined,
      currentScores: undefined,
      percentCorrect: undefined,
      completedQuiz: false
  
    }

    this.handleClick = this.handleClick.bind(this);
    this.returnTotalScore = this.returnTotalScore.bind(this);
    this.printTotalScore = this.printTotalScore.bind(this);
    this.updateAllScores = this.updateAllScores.bind(this);
    this.saveScoresToDB = this.saveScoresToDB.bind(this);
    this.shareTweet = this.shareTweet.bind(this);

  }
  saveScoresToDB() {
    if (this.state.currentScores > 0){
      let myScore = {
        slug: this.props.sight,
        leaderboard: {
          email: 'hello',
          score: parseInt(this.state.currentScores)
        }
      };
      this.props.saveScores(myScore);    
    }
  }
  shareTweet(linktext){
    var tweet = "https://twitter.com/intent/tweet?hashtags=yellowstoneodyssey&text=" + linktext+ "&url=https://montanacodeschool.com";
    return tweet
  }

  handleClick() {
    this.updateAllScores();
  }

  componentDidMount() {
    document.getElementById("quiz-answer-block").style.display = 'none';
  }
  updateAllScores() {
    let numAnswered = this.props.getLocalScores().length;
    let currentScores = this.returnTotalScore(numAnswered);
    var completed = false;
    if (numAnswered === this.props.qty) {
      completed = true
    } 
    let percentCorrect = this.printTotalScore(currentScores, numAnswered);
    this.setState({numAnswered: numAnswered, currentScores: currentScores, percentCorrect: percentCorrect, completedQuiz: completed})
  }
  //this returns the number correctly answered
  returnTotalScore(numAnswered){
    let currentScores = 0;
    let percentCorrect = 0;
    if(numAnswered > 0) {
      currentScores = this.props.getLocalScores().reduce((a, b)=>{
      return a + b;
      }, 0);
      return currentScores;
    } else {
      return 0;
    }
  }
  //this returns the percentage of correct answers
  printTotalScore(currentScores, numAnswered){
    return (100 * currentScores / numAnswered).toFixed(2); 
  }

  render () {
    let htmlQuizQ = [];
    let thisAnswer = '';
    this.saveScoresToDB();
    let tweetText = encodeURI('I scored ' + this.state.percentCorrect + '%');

    // build answer for each question
    this.props.data.forEach(function(element, index) {   
      thisAnswer = element.question;
      element.options.forEach((e, i)=> { 
        if (element.scores[i] > 0) {
          let result = e  + " (" + element.scores[i] + " point)";
          let extraInfo = '';
          if (element.info) {
            extraInfo = <blockquote>{element.info}</blockquote>;
          }
          htmlQuizQ.push(<li><span className='answerQ'>{thisAnswer}: <strong>{result}</strong></span>{extraInfo}</li>); 
        }
      });
    });
      
    return (
      <div>
        <ModalBox  completedQuiz={this.state.completedQuiz} handleClick={this.handleClick} />
        <div id="quiz-answer-block" className="quiz-answer-block">
          <h3>Answers</h3>
          <p>{(JSON.parse(sessionStorage.getItem('user'))).firstName}, You scored {this.state.completedQuiz} {this.state.percentCorrect}%, {this.state.currentScores} out of {this.state.numAnswered} correct</p>
          <ul>
            {htmlQuizQ}
          </ul>
          <a target="_blank" href={this.shareTweet(tweetText)}>Share on Twitter!</a>
          <div className='social-button'>
          <Button color='facebook'>
            
            <Icon name='facebook' /> Facebook <FacebookShare />
              </Button>
              <Button color='twitter' link={this.shareTweet(tweetText)}>
            <Icon name='twitter' /> Twitter
          </Button>
          </div>
        </div>
      </div>
    );
  }
}