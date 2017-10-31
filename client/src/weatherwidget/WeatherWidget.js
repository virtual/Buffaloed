import React, { Component } from 'react';

export default class WeatherWidget extends Component {
  render () {
  var flark = this.props.weatherData;
  let iconURL = "https://openweathermap.org/img/w/" +  flark.weather[0].icon + ".png";
  return (
    <div>
        <img alt={flark.weather["0"].description} src={iconURL}/>
    </div>
    );
  }
}