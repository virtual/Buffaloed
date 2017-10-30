import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Weather from '../weather/Weather';
import {
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Segment
 } from 'semantic-ui-react';


//<img className="ui medium circular image" src="/images/wireframe/square-image.png">

export default class Footer extends Component {
  
  render () { 
    return (
      <div className="footer">
         <Segment inverted vertical style={{ padding: '2em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={5}>
                  <Header inverted as='h4'>
                    <Link className="item" to="/">Yellowstone Odyssey</Link>
                    </Header>
                  <List link inverted>
                    {/* <List.Item as='a'>Sitemap</List.Item> */}
                     
                    <Link className="item" to="/about">About Yellowstone</Link>
                    <Link className="item" to="/sights">Check out some sights!</Link> 
                    <a className="item" target="_blank" href="//www.nps.gov/yell/index.htm">YNP official website</a> 
                    <Link className="item" to="/contactinfo">Contact Us</Link>
                  </List>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Header inverted as='h4' content='Current Weather' />
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

     