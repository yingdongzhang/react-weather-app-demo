import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
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
  }

  handleCityInputChange = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  handleSearch = () => {
    const { fetchWeather } = this.props
    fetchWeather(this.state.city)
  }

  componentDidUpdate() {
    const { city } = this.state
    const { weatherData } = this.props

    if (weatherData.loading) {
      document.title = 'loading...'
    } else if (weatherData.weather) {
      document.title = `${city} - ${weatherData.weather.temp}°C`
    }
  }

  render() {
    const { city } = this.state
    const { weatherData } = this.props
    const { weather, loading } = weatherData

    return (
      <div>
        <div className="row">
          <Form>
            <Form.Group inline>
              <Form.Field>
                <label>Enter your city</label>
                <Input placeholder='Melbourne, AU' loading={loading} onChange={this.handleCityInputChange} />
              </Form.Field>
              <Button primary loading={loading} onClick={this.handleSearch}>Search</Button>
            </Form.Group>
          </Form>
        </div>
        <div className="row">
          <h2>Current weather in {city}</h2>
          {weather && <WeatherCard weather={weather} />}
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
      fetchWeather: (city) => dispatch(fetchWeather(city)),
    }
  }
)(App)
