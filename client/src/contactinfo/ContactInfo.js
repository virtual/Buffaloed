import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';


export default class ContactInfo extends Component {
  render () {
    return (
  <Card.Group>
    <Card>
      <Card.Content>
        <Image floated='right' size='small' src='https://heroichollywood.b-cdn.net/wp-content/uploads/2016/12/gandalf-1024x576.jpg?x42694' />
        <Card.Header>
          Jeanine Schoessler
        </Card.Header>
        <Card.Meta>
          Code Wizard
        </Card.Meta>
        <Card.Meta>
          <a href='mailto:jeanine.mt@gmail.com'>jeanine.mt@gmail.com</a>
        </Card.Meta>
        <Card.Description>
        <strong>Montana Code School Full Time Student - Bozeman</strong>
        </Card.Description>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Image floated='right' size='small' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAMvGy5l_A7Ps_tRsAOWsb_WSECBsJyTS-KEYBNT-CZOTpLEkR' />
        <Card.Header>
          Emily Kimmel
        </Card.Header>
        <Card.Meta>
          Where am I?
        </Card.Meta>
        <Card.Meta>
          <a href="mailto:kimmelem@hotmail.com">kimmelem@hotmail.com</a>
        </Card.Meta>
        <Card.Description>
        <strong>Montana Code School Full Time Student - Bozeman</strong>
        </Card.Description>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Image floated='right' size='small' src='http://www.cats.org.uk/uploads/images/featurebox_sidebar_kids/grief-and-loss.jpg' />
        <Card.Header>
          Kate Ten
        </Card.Header>
        <Card.Meta>
          Developer
        </Card.Meta>
        <Card.Meta>
          <a href="mailto:katharina.a.root@gmail.com">katharina.a.root@gmail.com</a>
        </Card.Meta>
        <Card.Description>
        <strong>Montana Code School Full Time Student - Bozeman</strong>
        </Card.Description>
      </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Image floated='right' size='small' src='http://3milliondogs.com/blog-assets-two/2015/02/spacedogs.png' />
        <Card.Header>
          Rob Herrmann
        </Card.Header>
        <Card.Meta>
          Time Traveller 
        </Card.Meta>
        <Card.Meta>
          <a href="mailto:robjherrmann@gmail.com">robjherrmann@gmail.com</a>
        </Card.Meta>
        <Card.Description>
        <strong>Montana Code School Full Time Student - Bozeman</strong>
        </Card.Description>
      </Card.Content>
    </Card>
  </Card.Group>
 );
}
}

