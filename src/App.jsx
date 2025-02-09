import { useState } from 'react'
import './App.css'
import Model from './HandLandMarker.jsx'
import sheet_music from '/sheetmusic/maryHadALittleLamb.png';

function App() {

  const [cameraIsVisible, setVisibility] = useState(false)

  function handleCameraVisibility() {
    setVisibility(!cameraIsVisible)
  }

  return (
    <div>
      {!cameraIsVisible ? (
        // Initial hero section
        <section id="hero">
          <h2>Welcome to PaperKeys</h2>
          <p>
            Experience a modern, interactive interface that brings creativity to your fingertips.
          </p>
          <button onClick={handleCameraVisibility}>Get Started</button>
        </section>
      ) : (
        // Layout when camera is active
        <div className="main-layout">
          <div className="camera-section">
            <Model />
          </div>
          <div className="music-sheet">
            <h1>Music Sheet</h1>
            <img class = "music-sheet-img" src={sheet_music} alt="Mary Had a Little Lamb Piano Sheet Music"/>
          </div>
        </div>
      )}
    </div>
  );
}

export default App
