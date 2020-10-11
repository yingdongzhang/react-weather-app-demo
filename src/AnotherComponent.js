import React from 'react'
import { useDocumenTitle, useLocalTime } from './effects'

export default function AnotherComponent() {
  const [ time, setTime ] = useLocalTime(0)

  return (
    <p>UTC time: {time}</p>
  )
}
