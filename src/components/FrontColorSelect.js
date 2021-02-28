import React, { useState } from 'react'

export const FrontColor = () => {
  const frontColors = ['#008080', '#ffd700', '#111', '#79589F'];
  const [selectedColor, setSelectedColor] = useState('#008080');
  
  function handleFrontColor(event) {
    setSelectedColor((prev) => prev = event.target.value)
    localStorage.setItem('frontColor', event.target.value)
  }

  return (
    <div className="settings-front-color-wrapper">
        <h1 className="settings-description">Front side color:  </h1>
          <select name="parameters"
          className="front-color-parameters"
          value={localStorage.getItem('frontColor') || selectedColor}
          style={{backgroundColor: `${localStorage.getItem('frontColor') || selectedColor}`}}
          onChange={(event) => handleFrontColor(event)}
          >
            {frontColors.map((color) => {
              return < option
              key={color}
              className="front-color-parameters"
              style={{background: `${color}`}}
              value={color}
              >
              </option>
            })}
          </select>
      </div>
  )
}