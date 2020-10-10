import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import moment from 'moment'

import './App.css'
import WeatherCard from './components/WeatherCard'
import fetchWeatherApi from './api/fetchWeatherApi'

export default function AppWithHooks() {
  const [ city, setCity ] = useState('')
  const [ weather, setWeather ] = useState(null)
  const [ loading, setLoading ] = useState(false)

  useDocumenTitle(city, weather)
  const [ time, setTime ] = useLocalTime(city, weather)

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
        <h2>Current weather in {city}</h2>
        {weather && <WeatherCard weather={weather} />}
        {time && <h3>Local time {time}</h3>}
      </div>
    </div>
  )
}

function useDocumenTitle(city, weather) {
  useEffect(() => {
    if (weather) {
      document.title = `${city} - ${weather.temp}°C`
    }
  })
}

function useLocalTime(city, weather) {
  const [ time, setTime ] = useState('')

  useEffect(() => {
    const intervId = setInterval(() => {
      if (city && weather) {
        const localTime = moment.utc(moment().utc().valueOf() + weather.timezone*1000)
        setTime(localTime.format('DD/MM/YYYY HH:mm:ss'))
      }
    }, 1000)
    return () => {
      console.log('useLocalTime effect, clear interval -> ', intervId)
      clearInterval(intervId)
    }
  })

  return [ time, setTime ]
}
