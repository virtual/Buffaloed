import React, { Component } from 'react';
import WeatherWidget from '../weatherwidget/WeatherWidget'; 

export default class Weather extends Component {
  constructor () {
    super();
    this.state = {
      initialized: false,
      weatherData: {}
    };
    this.fetchWeatherData = this.fetchWeatherData.bind(this);
  }
  fetchWeatherData (city) {
    this.setState({
      initialized: false
    });
    // wrap your
    // logic fetching all the weather api data into a method.
    
    // move to server and return data object
    var weatherApiKey = process.env.REACT_APP_WEATHER_API;
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=Gardiner&units=imperial&appid=' + weatherApiKey;
    // console.log(url + "this is the url");
    fetch(url).then(function (response) {
      return response.json();
    }).then((weatherObj) => {
      if (weatherObj !== undefined) {
        this.setState({
          initialized: true,
          weatherData: weatherObj
        });
      } else {
        this.fetchWeatherData();
      }
    });
  }
  componentDidMount () {
    this.fetchWeatherData();
  }
  render () {
    if (this.state.initialized) {
      let tempF = Math.round(this.state.weatherData.main.temp);
      return (
        <div>        
          <WeatherWidget weatherData={this.state.weatherData}/>
          <p>
          {tempF}°F
          <br/>
          {this.state.weatherData.weather[0].description} </p>
        </div>
      );
    } else {
      return (
        <p>
          Loading...
        </p>
      );
    }
  }
} 
