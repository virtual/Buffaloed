import React, { Component } from 'react';

export default class WeatherWidget extends Component {
  constructor(){
    super()
  }
render () {
var flark = this.props.weatherData;
  let iconURL = "http://openweathermap.org/img/w/" +  flark.weather[0].icon + ".png";
  //  console.log(this.props.weatherData)
  return (
    <div>
        <img src={iconURL}/>
    </div>
    );
  }
}