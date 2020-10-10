import React, { useState, useEffect } from 'react'
import { Input, Button } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'

import './App.css'
import WeatherCard from './components/WeatherCard'
import fetchWeather from './actions/fetchWeather.action'

export default function AppWithHooks() {
  const [ city, setCity ] = useState('')
  const { weather, loading } = useSelector(state => state.weather)
  const dispatch = useDispatch()

  useEffect(() => {
    if (loading) {
      document.title = 'loading...'
    } else if (weather) {
      document.title = `${city} - ${weather.temp}°C`
    }
  })

  return (
    <div className="app-container">
      <h1>Current weather in {city}</h1>
      {weather && <WeatherCard weather={weather} />}
      <div>
        <h3>Enter your city</h3>
        <Input placeholder='Melbourne, AU' loading={loading} onChange={(e) => setCity(e.target.value)} />
        <Button primary loading={loading} onClick={() => dispatch(fetchWeather(city))}>Search</Button>
      </div>
    </div>
  )
}
