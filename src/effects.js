import { useState, useEffect } from 'react'
import moment from 'moment'

export function useLocalTime(timezoneOffset) {
  const [ time, setTime ] = useState('')

  useEffect(() => {
    const intervId = setInterval(() => {
      if (timezoneOffset !== null) {
        const localTime = moment.utc(moment().utc().valueOf() + timezoneOffset*1000)
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

export function useDocumenTitle(city, weather) {
  useEffect(() => {
    if (weather) {
      document.title = `${city} - ${weather.temp}°C`
    }
  })
}
