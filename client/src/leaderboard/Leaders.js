import React, { Component } from 'react';
import { Table, Header, Image } from 'semantic-ui-react'


export default class Leaders extends Component {
  render () {
    return (
      
         <Table.Row key={this.props.email}>
              <Table.Cell>
              <Header as='h4' image>
              <Image src='https://secure.gravatar.com/avatar/0fd34130695d3d69a2a05f59511a5d5d?size=1000' shape='rounded' size='mini' />
              <Header.Content>
                {this.props.email}
              <Header.Subheader>Human Resources</Header.Subheader>
            </Header.Content>
          </Header>

              </Table.Cell>
              <Table.Cell>{this.props.score}</Table.Cell>
            </Table.Row>
    );
  }
}