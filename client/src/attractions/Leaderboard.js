import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Header, Image } from 'semantic-ui-react'

let tableData = [
  { name: 'John', points: 15 },
  { name: 'Amber', points: 40 },
  { name: 'Leslie', points: 25 },
  { name: 'Ben', points: 70 },
]

export default class Leaderboard extends Component {
  state = {
    column: null,
    data: tableData,
    direction: null,
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  render() {
    const { column, data, direction } = this.state

    return (
      <Table sortable compact basic='very' celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={column === 'name' ? direction : null} onClick={this.handleSort('name')}>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'points' ? direction : null} onClick={this.handleSort('points')}>
              Points
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(data, ({ points, name }) => (
            <Table.Row key={name}>
              <Table.Cell>
              <Header as='h4' image>
              <Image src='https://secure.gravatar.com/avatar/0fd34130695d3d69a2a05f59511a5d5d?size=1000' shape='rounded' size='mini' />
              <Header.Content>
                {name}
              <Header.Subheader>Human Resources</Header.Subheader>
            </Header.Content>
          </Header>

              </Table.Cell>
              <Table.Cell>{points}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}
