import React, { useState, useEffect } from 'react'
import { Input, Button } from 'semantic-ui-react'
import './App.css'
import WeatherCard from './components/WeatherCard'

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
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=[YOUR_API_KEY]`)
    const data = await response.json()
    const weather = {
      ...data.main,
      ...data.weather[0],
    }
    setWeather(weather)
    setLoading(false)
  }

  return (
    <div className="app-container">
      <h1>Current weather in {city}</h1>
      {weather && <WeatherCard city={city} weather={weather} />}
      <div>
        <h3>Enter your city</h3>
        <Input placeholder='Melbourne, AU' loading={loading} onChange={(e) => setCity(e.target.value)} />
        <Button primary loading={loading} onClick={fetchWeather}>Search</Button>
      </div>
    </div>
  )
}
