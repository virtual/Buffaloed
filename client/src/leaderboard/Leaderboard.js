import React, { Component } from 'react';
import Leaders from "./Leaders";
import { Table, Header, Image } from 'semantic-ui-react';

export default class Leaderboard  extends Component {
  constructor() {
    super();
  }


  render () {
    //need to check whether the quiz has never been taken
    //Object.keys(obj).length === 0
    if(Object.keys(this.props.scores).length > 0) {
      console.log('Leaderboard');
      //console.log(this.props.scores);
      let leaderboard = this.props.scores[0].leaderBoard;

      leaderboard.sort((a, b)=>{
            return a.score < b.score;
        })    
        console.log(leaderboard);
        leaderboard = leaderboard.slice(0, 5).sort(function (x, y) {
          var n = x.score < y.score;
          if (n !== 0) {
              return n;
          }
      
          return x.email > y.email;
      });;


      let ldrhtml = [];
      if(leaderboard.length > 0) {
        leaderboard.forEach((e)=> {
          ldrhtml.push(<Leaders  email={e.email} score={e.score}/>);
        })
      }
      return(
      <Table sortable compact basic='very' celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell>
              Points
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {ldrhtml}
        </Table.Body>
      </Table>
      )
    } else { 
    return (
      <div>
      </div>
      );
    }
  }
}