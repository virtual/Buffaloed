import React, { Component } from 'react';
import QuizQuestion from './QuizQuestion'
import './Quiz.css';

export default class QuizContainer extends Component {
  constructor() {
    super();
    this.state = {
      config: {
        dataSource: '/quizzes/data.json'
      },
      data: null
    };
    this.getQuizData = this.getQuizData.bind(this);
    this.displayQuiz = this.displayQuiz.bind(this);
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
    data[0].questions.forEach(function(element, index) {
      htmlQuizQ.push(<QuizQuestion element={element} index={index} />); 
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