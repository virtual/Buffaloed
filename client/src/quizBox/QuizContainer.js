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
      data: null
    };
    this.getQuizData = this.getQuizData.bind(this);
    this.displayQuiz = this.displayQuiz.bind(this);
    this.setScores = this.setScores.bind(this)
    this.getScores = this.getScores.bind(this)
  }

  getScores(){
    return this.state.userScores;
  }
  setScores(option) {
    console.log("setscore");
    // console.log(option);
    this.setState({userScores: this.state.userScores.concat([option])});
    
   console.log(this.state.userScores);

    // console.log(this.state);

  }
 

  componentWillMount(){
    var url = '/quizzes/'+ this.props.sight + '.json';
    console.log(url);
    this.getQuizData(url).then(
      (data)=>{
        this.setState({
          data: JSON.parse(data)
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
    console.log(data[0]);
    data[0].questions.forEach((element, index)=> {
      htmlQuizQ.push(<QuizQuestion setScores={this.setScores} element={element} index={index} />); 
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
          <QuizAnswer getScores={this.getScores}  data={this.state.data[0].questions}/>
          </div>
        </div>
      );
    } else {
      return (
        <div>Loading!!</div>
      )
    }
  }
}