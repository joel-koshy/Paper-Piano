import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Model from './HandLandMarker.jsx'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <h1>Paper Piano!!</h1>
      <Model/>
    </>
  )
}

export default App
