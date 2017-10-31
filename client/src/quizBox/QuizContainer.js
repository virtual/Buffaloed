import React, { Component } from 'react';
import QuizQuestion from './QuizQuestion'
import QuizAnswer from './QuizAnswer'
import './Quiz.css';

export default class QuizContainer extends Component {
  constructor() {
    super();
    this.state = {
      config: {
        dataSource: '/quizzes/data.json'
      },
      userScores: [],
      questionQuantity: 0,
      data: null
    };
    this.getQuizData = this.getQuizData.bind(this);
    this.displayQuiz = this.displayQuiz.bind(this);
    this.setLocalScores = this.setLocalScores.bind(this);
    this.getLocalScores = this.getLocalScores.bind(this);
  }

  getLocalScores(){
    return this.state.userScores;
  }
  setLocalScores(option) {
    this.setState({userScores: this.state.userScores.concat([option])});
  }
 
  componentWillMount(){
    var url = '/quizzes/'+ this.props.sight + '.json';
    this.getQuizData(url).then(
      (data)=>{
        this.setState({
          data: JSON.parse(data),
          questionQuantity: JSON.parse(data)[0].questions.length
        });
      }
    );
   
  }
  getQuizData(url) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', url);
			xhr.onload = function onload(data) {
				if (this.status >= 200 && this.status < 300) {
					resolve(xhr.response);
				} else {
					reject({
						status: this.status,
						statusText: xhr.statusText
					});
				}
			};
			xhr.onerror = function onerror() {
				reject({
					status: this.status,
					statusText: xhr.statusText
				});
			};
			xhr.send();
		});
  }
  displayQuiz(data) { 
    let htmlQuizQ = [];
    data[0].questions.forEach((element, index)=> {
      let key = "q"+index;
      htmlQuizQ.push(<QuizQuestion setLocalScores={this.setLocalScores} element={element} index={index} key={key} />); 
    });
    return htmlQuizQ;
  }
  render () {
    if (this.state.data !== null) {
      let html = this.displayQuiz(this.state.data);
      
      return (
        <div className="myQuiz" id="quizForm">
          <div>
          {html}
          <QuizAnswer getLocalScores={this.getLocalScores} sight={this.props.sight} saveScores={this.props.saveScores} data={this.state.data[0].questions} qty={this.state.questionQuantity}/>
          </div>
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
}