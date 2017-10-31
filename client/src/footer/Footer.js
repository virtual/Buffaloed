import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Weather from '../weather/Weather';
import {
  Container,
  Grid,
  Header,
  Image,
  List,
  Segment
 } from 'semantic-ui-react';
 
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
                    <a className="item" target="_blank" rel="noopener noreferrer" href="//www.nps.gov/yell/index.htm">YNP official website</a> 
                    <Link className="item" to="/contactinfo">Contact Us</Link>
                  </List>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Header inverted as='h4'>
                  <a className="item" target="_blank" rel="noopener noreferrer" href='https://forecast.weather.gov/MapClick.php?zoneid=WYZ001'>Current Weather</a> 
                  </Header>
                  <Weather />
                </Grid.Column>
                <Grid.Column width={5}>
                <Image alt='Yellowstone Odyssey' src='/img/logo.png' size='medium'/>        
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    )
  }
}

     