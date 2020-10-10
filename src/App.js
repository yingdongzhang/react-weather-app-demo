import React from 'react'
import { Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

import './App.css'
import WeatherCard from './components/WeatherCard'
import fetchWeather from './actions/fetchWeather.action'

class App extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      city: '',
    }

    this.handleCityInputChange = this.handleCityInputChange.bind(this)
    this.searchWeather = this.searchWeather.bind(this)
  }

  handleCityInputChange(e) {
    this.setState({
      city: e.target.value
    })
  }

  searchWeather() {
    const { fetchWeather } = this.props
    fetchWeather(this.state.city)
  }

  componentDidUpdate() {
    const { city } = this.state
    const { weatherData } = this.props

    if (weatherData.weather) {
      document.title = `${city} - ${weatherData.weather.temp}°C`
    }
  }

  render() {
    const { city } = this.state
    const { weatherData } = this.props
    const { weather, loading } = weatherData

    return (
      <div className="app-container">
        <h1>Current weather in {city}</h1>
        {weather && <WeatherCard weather={weather} />}
        <div>
          <h3>Enter your city</h3>
          <Input placeholder='Melbourne, AU' loading={loading} onChange={this.handleCityInputChange} />
          <Button primary loading={loading} onClick={this.searchWeather}>Search</Button>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      weatherData: state.weather,
    }
  },
  (dispatch) => {
    return {
      fetchWeather: city => dispatch(fetchWeather(city)),
    }
  }
)(App);
