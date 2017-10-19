import React, { Component } from 'react';
import Quiz from '../../node_modules/javascript-quiz-using-json/src/js/quiz'; // entry point 
import '../../node_modules/javascript-quiz-using-json/examples/css/default.css';
import './Quiz.css';
import Leaderboard from '../sights/Leaderboard';
import { Grid } from 'semantic-ui-react';

export default class QuizBox extends Component {
  constructor() {
    super();
    this.state= {
      dataPath: 'data'
    }
  }
  componentWillMount() {
    if(this.props.sight) {
      this.setState({dataPath: this.props.sight})
    }
  }

  componentDidMount() {
    if(window.Quiz) {
      var options = {
        id: 'quiz',
        dataSource: '/quizzes/' + this.state.dataPath + '.json'
      };
      window.Quiz.init(options);
    }
  }
  render () {
    return (
      <Grid>
        <Grid.Column computer={10} mobile={16} tablet={10}>
            <div id="myQuiz">
            </div>  
        </Grid.Column> 
        <Grid.Column computer={6} mobile={16} tablet={6}>
            <Leaderboard />  
        </Grid.Column> 
      </Grid>
    );
  }
}