import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react'
import TableRow from './TableRow';
import { Link } from 'react-router-dom'; 
let axios = require('axios');

export default class Admin extends Component {
  constructor(){
    super();
    this.fetchSights = this.fetchSights.bind(this);
    this.state = {
      initalized: false,
      sights: [],
      order: 'normal',
      limit: 100
    }
  }

  componentDidMount(){
    this.fetchSights();
  }

  fetchSights() {
    var url = '/sights';
    axios.get(url, { 
    }).then((sightsObj) => { 
      if (sightsObj.data !== undefined) { 
        this.setState({ 
          initialized: true,
          sights: sightsObj.data
        });
      }  else {
        console.log('undefined');
      }
    });
  }

  render(){
    let sightList = []; 
    this.state.sights.forEach((sight, i) => {
      sightList.push(
      <TableRow {...sight} />
      );
    });
  
    return(
      <div>
       <div><Button as={Link} to="/add" floated="right" primary >Add New Sight</Button>
       <h1>Edit Sights</h1></div>
      <Table sortable compact unstackable celled>
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
    </div>
    )  
  }
}