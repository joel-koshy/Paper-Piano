import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Model from './HandLandMarker.jsx'

function App() {

  const [cameraIsVisible, setVisibility] = useState(false)

  function handleCameraVisibility() {
    setVisibility(!cameraIsVisible)
  }

  return (
    <>
      <section id="hero">
        <h2>Welcome to Paper Piano</h2>
        <p>Experience a modern, interactive interface that brings creativity to your fingertips.</p>
        <button onClick={handleCameraVisibility}>Get Started</button>
      </section>
      {cameraIsVisible && <Model/>}
    </>
  )
}

export default App
