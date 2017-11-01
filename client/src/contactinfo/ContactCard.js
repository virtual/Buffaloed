import React, { Component } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';

export default class ContactCard extends Component {
  render() {
    let mailTo = 'mailto:'+ this.props.email
    var img = '/img/photos/' + this.props.img;
    let twitter = '';
    console.log(this.props);
    if (this.props.twitter) {
      let twitterLink = 'https://twitter.com/' + this.props.twitter;
      twitter = <a href={twitterLink}><Icon link={true} name='twitter' size='large' /></a>
    }
    const extra = (
      <p>
        <a href={mailTo}><Icon link={true} name='mail outline' size='large' /></a>
        {twitter}
      </p>
    ) 
    return (
      <Card image={img} fluid={true} header={this.props.name}
      meta={this.props.meta}
      description={this.props.desc} extra={extra}>
    </Card>
    );
  }
}