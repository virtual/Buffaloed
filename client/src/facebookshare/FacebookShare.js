import React, { Component } from 'react';
import { FacebookButton, FacebookCount } from "react-social";
import FacebookProvider, { Share,ShareButton } from 'react-facebook';
import {Button, Icon} from 'semantic-ui-react';

export default class FacebookShare  extends Component {
  render () { 
    return (
      <FacebookProvider appId="1916295301955813">
        <Share href="https://www.montanacodeschool.com" title="Yellowstone Odyssey" >
          <a className="ui facebook button" target="_blank" color='twitter' 
          ><Icon name='facebook' /> Share on Facebook</a> 
        </Share>
      </FacebookProvider>  
    );
  }
}