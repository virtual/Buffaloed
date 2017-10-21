import React, { Component } from 'react';
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
      // costHTML.push(<p><strong>{e.title} - {costConverted}</strong> <br/>{e.description}</p>); 
      htmlQuizQ.push(<p>{element.question}</p>); 
      element.options.forEach(function(e, i) {
        htmlQuizQ.push(<label><input name={index} type="radio" /> {e}</label>);
      });
      htmlQuizQ.push(<hr/>);
    });
    return htmlQuizQ;
  }
  render () {
    if (this.state.data !== null) {
      //console.log(this.state.data);
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