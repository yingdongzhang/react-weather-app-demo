export default async function fetchWeatherApi(city) {
  const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
  const data = await response.json()
  return {
    ...data.main,
    ...data.weather[0],
    timezone: data.timezone,
  }
}
