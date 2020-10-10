import React, { useState, useEffect } from 'react'
import { Input, Button } from 'semantic-ui-react'
import './App.css'
import WeatherCard from './components/WeatherCard'
import fetchWeatherApi from './api/fetchWeatherApi'

export default function AppWithHooks() {
  const [ city, setCity ] = useState('')
  const [ weather, setWeather ] = useState(null)
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    if (weather) {
      document.title = `${city} - ${weather.temp}°C`
    }
  })

  async function fetchWeather() {
    setLoading(true)
    const weather = await fetchWeatherApi(city)
    setWeather(weather)
    setLoading(false)
  }

  return (
    <div className="app-container">
      <h1>Current weather in {city}</h1>
      {weather && <WeatherCard weather={weather} />}
      <div>
        <h3>Enter your city</h3>
        <Input placeholder='Melbourne, AU' loading={loading} onChange={(e) => setCity(e.target.value)} />
        <Button primary loading={loading} onClick={fetchWeather}>Search</Button>
      </div>
    </div>
  )
}
