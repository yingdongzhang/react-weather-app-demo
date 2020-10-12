const fetchWeather = city => {
  return { type: 'FETCH_WEATHER', payload: { city } }
}

export default fetchWeather
