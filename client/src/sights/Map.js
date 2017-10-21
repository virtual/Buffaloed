import React, {Component} from 'react'; 
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
 
export default class FeatureMap extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      hasLocation: false,
      zoomLevel: 16,
      latlng: {
        lat: 46.5,
        lng: -111,
      }
    }
  }

  componentWillMount() {
    if(this.props.lat && this.props.lng) {
      this.setState({
        latlng: {
          lat: this.props.lat,
          lng: this.props.lng
        }
      })
    }
  }

  handleClick = () => {
    this.refs.map.leafletElement.locate()
  }
  
  render() {
    let center = [
      this.state.latlng.lat,
      this.state.latlng.lng
    ];
    
    const marker =  
      <Marker map={this.refs.map} position={center}>
        <Popup>
          <span>You are here</span>
        </Popup>
      </Marker>;
    
    return (
      <div>
        <Map
          center={center}
          length={4}
          onClick={this.handleClick}
          onLocationfound={this.handleLocationFound}
          ref="map"
          zoom={this.state.zoomLevel}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          {marker}
        </Map>
      </div>
     )
    }
  }