import React, { Component } from 'react';
import FeatureCards from '../featurecards/FeatureCards'; 
import {Link} from 'react-router-dom';
import {Header, Icon, Button, Container, Divider } from 'semantic-ui-react';

export default class Homepage extends Component {
  render () {
    return (
      <div> 
        <FeatureCards order="random" limit="3" /> 
        <Divider section />
        <Container textAlign='left' text >
          <Container textAlign='center'>
            <Icon name='tree' size="big" fitted /><Icon name='tree' size="huge" fitted /><Icon name='tree' size="big" fitted />
          </Container>
          <Header as='h2' icon textAlign='center'>
            The Yellowstone Odyssey 
          </Header>
          <p>You're planning a trip to Yellowstone, so we know you're smart-  but get even smarter by taking our Yellowstone Park quizzes and using our maps and Sights-descriptions to help plan your trip.</p>
          <p>As you prepare to wander through Yellowstone National Park, use the Yellowstone Odyssey to get even more inspired.  This app can help direct you to some of the more famous sights within the park.  In addition, you can impress your traveling companions with the Yellowstone-centric quizzes and use the interactive maps to keep yourself oriented while you visit the stunning and unique surroundings of the Park.</p>

          <Container textAlign='center'>
            <Button primary content='Get Started' icon='right arrow' size="medium" labelPosition='right' as={Link} to='/sights' />
          </Container>
        </Container>     
      </div>
    );
  }
}