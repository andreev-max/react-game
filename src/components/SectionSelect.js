import React, { useState } from 'react'

export const SectionSelect = () => {
  const sections = ['languages', 'tools', 'frameworks', 'all'];
  const [selectedSection, setSelectedSection] = useState('languages');

  function handleSection(event) {
    setSelectedSection((prev) => prev = event.target.value)
    localStorage.setItem('section', event.target.value)
  }

  return (
    <div className="settings-section-wrapper">
        <h1 className="settings-description">Section:  </h1>
          <select name="parameters"
          className="section-parameters"
          value={localStorage.getItem('section') || selectedSection}
          onChange={(event) => handleSection(event)}
          >
          {sections.map((section) => {
            return <option
            key={section}
            value={section}
            className="section-parameters">
              {section}
            </option>
          })}
          </select>
      </div>
  )
}