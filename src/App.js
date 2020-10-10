import React from 'react'
import { Input, Button } from 'semantic-ui-react'
import './App.css'
import WeatherCard from './components/WeatherCard'
import fetchWeatherApi from './api/fetchWeatherApi'

class App extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      city: '',
      weather: null,
      loading: false,
    }

    this.handleCityInputChange = this.handleCityInputChange.bind(this)
    this.searchWeather = this.searchWeather.bind(this)
  }

  handleCityInputChange(e) {
    this.setState({
      city: e.target.value
    })
  }

  async searchWeather() {
    this.setState({
      loading: true,
    })

    const weather = await fetchWeatherApi(this.state.city)

    this.setState({
      weather,
      loading: false,
    })
  }

  componentDidUpdate() {
    const { city, weather } = this.state
    if (weather) {
      document.title = `${city} - ${weather.temp}°C`
    }
  }

  render() {
    const { city, weather, loading } = this.state
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

export default App;
