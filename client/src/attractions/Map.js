import React, {Component} from 'react'; 
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

 
export default class FeatureMap extends Component { 
    state = {
      hasLocation: false,
      latlng: {
        lat: 46.5,
        lng: -111,
      },
    }
  
    handleClick = () => {
      this.refs.map.leafletElement.locate()
    }
  
    handleLocationFound = e => {
      this.setState({
        hasLocation: true,
        latlng: e.latlng,
      })
    }
  
    render() {
      const marker = this.state.hasLocation ? (
        <Marker position={this.state.latlng}>
          <Popup>
            <span>You are here</span>
          </Popup>
        </Marker>
      ) : null
  
      return (
        <Map
          center={this.state.latlng}
          length={4}
          onClick={this.handleClick}
          onLocationfound={this.handleLocationFound}
          ref="map"
          zoom={10}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          {marker}
        </Map>
      )
    }
  }