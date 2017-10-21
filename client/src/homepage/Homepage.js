import React, { Component } from 'react';
import FeatureCards from '../featurecards/FeatureCards'; 
import {Header, Icon } from 'semantic-ui-react';

export default class Homepage extends Component {
  render () {
    return (
      <div> 
        <FeatureCards order="random" limit="3" /> 
        <Header as='h2' icon textAlign='center'>
        <Icon name='trophy' />
        remote: Resolving deltas
        <Header.Subheader>
        Total 14 (delta 9), reused 0 (delta 0)
remote: Resolving deltas: 100% (9/9), completed with 6 local objects.
To https://github.com/virtual/Buffaloed.git
   328def2..dbb1d09  master -> master
        </Header.Subheader>
      </Header>
      </div>
    );
  }
}