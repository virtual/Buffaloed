import React, { Component } from 'react';

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
    this.getQuizData('/quizzes/'+ this.props.sight + '.json').then(
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
      console.log(data);
    data.forEach(function(element) {
      console.log("elements");
      console.log(element);
    });
  }
  render () {
    if (this.state.data !== null) {
      //console.log(this.state.data);
      this.displayQuiz(this.state.data);

    return (
      <div>
        dd
      </div>
    );
  } else {
    return (
      <div>Loading!!</div>
    )
  }
  }
}