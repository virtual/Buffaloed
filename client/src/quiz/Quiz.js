import React, { Component } from 'react';
import Quiz from '../../node_modules/javascript-quiz-using-json/src/js/quiz'; // entry point 
import '../../node_modules/javascript-quiz-using-json/examples/css/default.css';

export default class QuizBox extends Component {
  constructor() {
    super();

    var configurations = {
      //id: 'quizName',                  // the element reference within the DOM
      dataSource: './data.json',       // the json quiz data location
      randomise: true,              // randomise the order of the questions to the user
      //loadingGif: './img/loading.gif', // loading image between rendering
    };
    
    window.Quiz.init(configurations);
  }
  render () {
    return (      
      <div>Mew Mew

        <div idName="quizName">Loading...</div>
      </div>
    );
  }
}