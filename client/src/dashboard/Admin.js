import React, { Component } from 'react';

import { Table, Header, Image } from 'semantic-ui-react'
import TableRow from './TableRow';
let axios = require('axios');


export default class Admin extends Component {
  constructor(){
    super();
    this.fetchSights = this.fetchSights.bind(this);
    this.state = {
      sights: [],
      order: 'normal',
      limit: 100
    }
  }

  componentDidMount(){
    this.fetchSights();
    
  }

  fetchSights() {
    var url = '/sightsInfo';

    axios.post(url, {
  }).then((sightObj) => {
      if (sightObj.data !== undefined) { 
        console.log(sightObj.data);
        this.setState({ 
          sights: (sightObj.data)
        });
      }  else {
        console.log('undefined');
      }
    }).catch(function(err) {
      console.log(err);
    });
  }

  render(){
     console.log(this.state.sights);
     let sightList = []; 
     this.state.sights.forEach((sight, i) => {
       sightList.push(
        <TableRow {...sight} />
       );
     });
     
     return(
     <Table sortable compact basic='very' celled>
       <Table.Header>
         <Table.Row>
         <Table.HeaderCell>
             Edit
           </Table.HeaderCell>
           <Table.HeaderCell>
             Name
           </Table.HeaderCell>
         </Table.Row>
       </Table.Header>
       <Table.Body>
         {sightList}
       </Table.Body>
     </Table>
     )
 }
}