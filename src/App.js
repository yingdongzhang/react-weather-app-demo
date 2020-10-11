import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import moment from 'moment'
import { connect } from 'react-redux'

import './App.css'
import WeatherCard from './components/WeatherCard'
import fetchWeather from './actions/fetchWeather.action'
import resetWeather from './actions/resetWeather.action'

class App extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      city: '',
      time: '',
      intervId: null,
    }
  }

  handleCityInputChange = (e) => {
    const { resetWeather } = this.props
    resetWeather()

    this.setState({
      city: e.target.value,
      time: '',
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
    const { weatherData } = this.props
    if (weatherData && weatherData.weather) {
      const localTime = moment.utc(moment().utc().valueOf() + weatherData.weather.timezone*1000)
      this.setState({
        time: localTime.format('DD/MM/YYYY HH:mm:ss')
      })
    }
  }

  render() {
    const { city, time } = this.state
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
          {city && <h2>Current weather in {city}</h2>}
          {weather && <WeatherCard weather={weather} />}
          {time && <h3>Local time {time}</h3>}
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
      resetWeather: () => dispatch(resetWeather()),
    }
  }
)(App)
