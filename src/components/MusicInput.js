import React, { useState } from 'react'

export const MusicInput = () => {
  const [musicValue, setMusicValue] = useState(0);

  function handleMusicValue(event) {
    setMusicValue(prev => prev = event.target.value)
    localStorage.setItem('musicValue', event.target.value)
  }

  return (
    <div className="settings-volume-wrapper">
        <h1 className="settings-description"> Music volume:
          <span className="output-value"> {localStorage.getItem('musicValue') || musicValue}</span> </h1>
        <div className="settings-volume-block">
          <span className="volume-value-min">0</span>
          <input type="range"
          value={localStorage.getItem('musicValue') || musicValue}
          min="0"
          max="100"
          step="1"
          className="slider"
          onChange={(event) => {handleMusicValue(event)}}
          />
          <span className="volume-value-max">100</span>
        </div>
      </div>
  )
}