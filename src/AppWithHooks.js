import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'

import './App.css'
import WeatherCard from './components/WeatherCard'
import fetchWeather from './actions/fetchWeather.action'
import resetWeather from './actions/resetWeather.action'
import { useDocumenTitle, useLocalTime } from './effects'

export default function AppWithHooks() {
  const [ city, setCity ] = useState('')
  const { weather, loading } = useSelector(state => state.weather)
  const dispatch = useDispatch()

  useDocumenTitle(city, weather)
  const [ time, setTime ] = useLocalTime(weather ? weather.timezone : null)

  function handleCityInputChange(e) {
    setCity(e.target.value)
    setTime('')
    dispatch(resetWeather())
  }

  function handleSearch() {
    dispatch(fetchWeather(city))
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
            <Button primary loading={loading} onClick={handleSearch}>Search</Button>
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
