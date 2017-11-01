import React, { Component } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';

export default class ContactCard extends Component {
  render() {
    let mailTo = 'mailto:'+ this.props.email
    var img = '/img/photos/' + this.props.img;
    let twitter = '', linkedin='';  
    if (this.props.twitter) {
      let twitterLink = 'https://twitter.com/' + this.props.twitter;
      twitter = <a href={twitterLink}><Icon color="twitter" link={true} name='twitter' size='large' /></a>
    }
    if (this.props.linkedin) {
      let linkedinLink = 'https://www.linkedin.com/in/' + this.props.linkedin;
      linkedin = <a href={linkedinLink}><Icon link={true} name='linkedin square' size='large' /></a>
    }
     
    const extra = (
      <p>
        <a href={mailTo}><Icon link={true} name='mail' size='large' /></a>
        {twitter}
        {linkedin}
      </p>
    ) 
    return (
      <Card image={img} fluid={true} header={this.props.name}
      meta={this.props.meta}  extra={extra}>
    </Card>
    );
  }
}