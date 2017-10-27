import React, { Component } from 'react';
import { Table, Header, Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const axios = require('axios');

export default class TableRow extends Component {
  constructor() {
    super();
     
  }
  componentDidMount(){
    console.log('mew!')
   console.log(this.props);
  }
  

  render () {
    const {name, img, lat, lng, slug, desc} = this.props;
    let link = "/edit/" + slug;
    return (
      
    <Table.Row >
      <Table.Cell>
        <Link to={link}><Icon name="pencil" /> Edit</Link>
      </Table.Cell>
      <Table.Cell>
        {name}
      </Table.Cell>
    </Table.Row>
    );
  }
}