import React, { Component } from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class TableRow extends Component {
  render () {
    const { name, slug } = this.props;
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