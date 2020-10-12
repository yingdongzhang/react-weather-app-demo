import React, { useState } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'

import './App.css'
import WeatherCard from './components/WeatherCard'
import fetchWeatherApi from './api/fetchWeatherApi'
import { useDocumenTitle, useLocalTime } from './effects'
import AnotherComponent from './AnotherComponent'

export default function AppWithHooks() {
  const [ city, setCity ] = useState('')
  const [ weather, setWeather ] = useState(null)
  const [ loading, setLoading ] = useState(false)

  useDocumenTitle(city, weather)
  const [ time, setTime ] = useLocalTime(weather ? weather.timezone : null)

  function handleCityInputChange(e) {
    setCity(e.target.value)
    setTime('')
    setWeather(null)
  }

  async function fetchWeather() {
    setLoading(true)
    const weather = await fetchWeatherApi(city)
    setWeather(weather)
    setLoading(false)
  }

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
              <Input placeholder='Melbourne, AU' loading={loading} onChange={handleCityInputChange} />
            </Form.Field>
            <Button primary loading={loading} onClick={fetchWeather}>Search</Button>
          </Form.Group>
        </Form>
      </div>
      <div className="row">
        {city && <h2>Current weather in {city}</h2>}
        {weather && <WeatherCard weather={weather} />}
        {time && <h3>Local time {time}</h3>}
      </div>
      <div className="row">
        <AnotherComponent />
      </div>
    </div>
  )
}
