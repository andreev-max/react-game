import React, { useState } from 'react'

const backColors = ['#008080', '#ffd700', '#111', '#79589F'];

export const BackColor = () => {
  
  const [selectedColor, setSelectedColor] = useState(localStorage.getItem('backColor') || backColors[2]);
  
  function handleBackColor(event) {
    setSelectedColor(event.target.value);
    localStorage.setItem('backColor', event.target.value);
  }

  return (
    <div className="settings-back-color-wrapper">
        <h1 className="settings-description">Back side color:  </h1>
          <select name="parameters"
          className="back-color-parameters"
          value={selectedColor}
          style={{backgroundColor: `${selectedColor}`}}
          onChange={handleBackColor}
          >
            {backColors.map((color) => {
               return < option 
              key={color}
              className="back-color-parameters"
              value={color}
              style={{backgroundColor: `${color}`}}
              >
              </option>
            })}
          </select>
      </div>
  )
}