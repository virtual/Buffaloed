import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import { Link } from 'react-router-dom';
import Weather from '../weather/Weather';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react';


//<img class="ui medium circular image" src="/images/wireframe/square-image.png">

export default class Footer extends Component {
  constructor(){
    super()
  }
  render () { 
    return (
      <div className="footer">
         <Segment inverted vertical style={{ padding: '2em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={5}>
                  <Header inverted as='h4' content='About' />
                  <List link inverted>
                    {/* <List.Item as='a'>Sitemap</List.Item> */}
                    <Link className="item" to="/contactinfo">Contact Us</Link>             
                  </List>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Header inverted as='h4' content='' />
                  <Icon color='blue' name='twitter' />
                  <Weather />
                  <List link inverted>
                    {/* <List.Item as='a'>Banana Pre-Order</List.Item>
                    <List.Item as='a'>DNA FAQ</List.Item> */}
                  </List>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Header as='h3' inverted>Experience Yellowstone</Header>
                  <Image size='small' src="https://ak4.picdn.net/shutterstock/videos/22429174/thumb/1.jpg?i10c=img.resize(height:160" alt='YNP front gate sign' />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    )
  }
}

     