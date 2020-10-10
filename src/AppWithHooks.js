import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'

import './App.css'
import WeatherCard from './components/WeatherCard'
import fetchWeather from './actions/fetchWeather.action'

export default function AppWithHooks() {
  const [ city, setCity ] = useState('')
  const { weather, loading } = useSelector(state => state.weather)
  const dispatch = useDispatch()

  useDocumenTitle(city, loading, weather)

  function handleCityInputChange(e) {
    setCity(e.target.value)
  }

  function handleSearch() {
    dispatch(fetchWeather(city))
  }

  return (
    <div>
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
        <h2>Current weather in {city}</h2>
        {weather && <WeatherCard weather={weather} />}
      </div>
    </div>
  )
}

function useDocumenTitle(city, loading, weather) {
  useEffect(() => {
    if (loading) {
      document.title = 'loading...'
    } else if (weather) {
      document.title = `${city} - ${weather.temp}°C`
    }
  })
}
