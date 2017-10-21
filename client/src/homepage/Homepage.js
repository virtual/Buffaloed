import React, { Component } from 'react';
import FeatureCards from '../featurecards/FeatureCards'; 
import {Link} from 'react-router-dom';
import {Header, Icon, Button, Container, Divider } from 'semantic-ui-react';

export default class Homepage extends Component {
  render () {
    return (
      <div> 
        <FeatureCards order="random" limit="3" /> 
        <Divider />
        <Container textAlign='center'>
          <Header as='h2' icon>
        <Icon name='tree' size="huge" textAlign='center' />
        Yellowstone
        <Header.Subheader>
          impress friends now!
        </Header.Subheader>
        </Header>
        <br />
        
        <Button basic color="black" content='Get Started' textAlign='center' icon='right arrow' size="medium" labelPosition='right' as={Link} to='/sights' />
        </Container>     
      </div>
    );
  }
}