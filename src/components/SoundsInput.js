import React, { useState } from 'react'

export const SoundsInput = () => {
  const [soundsValue, setSoundsValue] = useState(0);

  function handleSoundsValue(event) {
    setSoundsValue(prev => prev = event.target.value)
    localStorage.setItem('soundsValue', event.target.value)
  }

  return (
    <div className="settings-volume-wrapper">
        <h1 className="settings-description"> Music volume:
          <span className="output-value"> {localStorage.getItem('soundsValue') || soundsValue}</span> </h1>
        <div className="settings-volume-block">
          <span className="volume-value-min">0</span>
          <input type="range"
          value={localStorage.getItem('soundsValue') || soundsValue}
          min="0"
          max="100"
          step="1"
          className="slider" 
          onChange={(event) => {handleSoundsValue(event)}}
          />
          <span className="volume-value-max">100</span>
        </div>
      </div>
  )
}