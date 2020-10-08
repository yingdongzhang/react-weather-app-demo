import React from 'react'
import {
  Card,
  Image,
} from 'semantic-ui-react'
import './WeatherCard.css'

export default function WeatherCard({city, weather}){
  const { icon, temp, feels_like, temp_min, temp_max, description } = weather
  return (
    <Card>
      <Image src={`https://openweathermap.org/img/wn/${icon}@4x.png`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{`${city}. Now: ${temp}°C`}</Card.Header>
        <Card.Meta><span>{`Feels like ${feels_like}°C, min ${temp_min}°C, max ${temp_max}°C`}</span></Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
    </Card>
  )
}
