import React, { Component } from 'react';
import Quiz from '../../node_modules/javascript-quiz-using-json/src/js/quiz'; // entry point 
import '../../node_modules/javascript-quiz-using-json/examples/css/default.css';
import Leaderboard from '../sights/Leaderboard';

export default class QuizBox extends Component {
  constructor() {
    super();

    /* changed npm javascript-quiz-using-json 
    	function renderTemplate(html, id) {
      const existing = document.getElementById(id);
      // if(existing) {
      // 	existing.remove();
      // }
      const form = document.createElement('form');
      form.setAttribute('id', id);
      form.innerHTML = html;
      existing.appendChild(form);
    }
    */
    
  }
  componentDidMount() {
    if(window.Quiz) {
      var options = {
        id: 'quiz',
        dataSource: './data.json'
      };
      window.Quiz.init(options);
    }
  }
  render () {
    return (
      <div id="myQuiz">
       <Leaderboard /> 
      </div>  
      
      
    );
  }
}