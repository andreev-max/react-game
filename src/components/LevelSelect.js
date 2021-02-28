import React, { useState } from 'react'
import easy from '../icons/easy.png'
import normal from '../icons/normal.png'
import hard from '../icons/hard.png'
import impossible from '../icons/impossible.png'
import suicide from '../icons/suicide.png'

export const LevelSelect = () => {
  const levels = ['easy', 'normal', 'hard',
  'impossible', 'suicide'];
  const icons = [easy, normal, hard, impossible, suicide];
  const [selectedLevel, setSelectedLevel] = useState('easy');

  function handleLevel(event) {
    setSelectedLevel((prev) => prev = event.target.value)
    localStorage.setItem('level', event.target.value)
  }

  return (
    <div className="settings-level-wrapper">
        <h1 className="settings-description">Difficulty Level:  </h1>
          <select name="parameters"
          className="level-parameters"
          value={localStorage.getItem('level') || selectedLevel}
          onChange={(event) => handleLevel(event)}
          >
          {levels.map((level) => {
            return <option
            key={level}
            value={level}
            className="level-parameters"
            >
              {level}
            </option>
          })}
          </select>
      </div>
  )
}