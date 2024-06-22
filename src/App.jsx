import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WeatherHome from './pages/WeatherHome'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <WeatherHome/>
    </>
  )
}

export default App
