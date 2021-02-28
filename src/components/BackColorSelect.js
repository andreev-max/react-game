import React, { useState } from 'react'

export const BackColor = () => {
  const backColors = ['#008080', '#ffd700', '#111', '#79589F'];
  const [selectedColor, setSelectedColor] = useState('#008080');
  
  function handleBackColor(event) {
    setSelectedColor((prev) => prev = event.target.value)
    localStorage.setItem('backColor', event.target.value);
  }

  return (
    <div className="settings-back-color-wrapper">
        <h1 className="settings-description">Back side color:  </h1>
          <select name="parameters"
          className="back-color-parameters"
          value={localStorage.getItem('backColor') || selectedColor}
          style={{backgroundColor: `${localStorage.getItem('backColor') || selectedColor}`}}
          onChange={(event) => handleBackColor(event)}
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