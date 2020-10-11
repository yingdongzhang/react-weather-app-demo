import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import moment from 'moment'

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
      time: '',
      intervId: null,
    }
  }

  handleCityInputChange = (e) => {
    this.setState({
      city: e.target.value,
      time: '',
      weather: null,
    })
  }

  handleSearch = async () => {
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

  componentDidMount() {
    const intervId = setInterval(this.getCurrentTime, 1000)
    this.setState({
      intervId,
    })
  }

  componentWillUnmount() {
    console.log('componentWillUnmount, clear interval -> ', this.state.intervId)
    clearInterval(this.state.intervId)
  }

  getCurrentTime = () => {
    const { weather } = this.state
    if (weather) {
      const localTime = moment.utc(moment().utc().valueOf() + weather.timezone*1000)
      this.setState({
        time: localTime.format('DD/MM/YYYY HH:mm:ss')
      })
    }
  }

  render() {
    const { city, time, weather, loading } = this.state
    return (
      <div>
        <div className="row">
          <h1>Weather Card</h1>
        </div>
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
          {city && <h2>Current weather in {city}</h2>}
          {weather && <WeatherCard weather={weather} />}
          {time && <h3>Local time {time}</h3>}
        </div>
      </div>
    )
  }
}

export default App
