import React, { useState } from 'react'

const sections = ['languages', 'tools', 'frameworks', 'all'];

export const SectionSelect = () => {
  
  const [selectedSection, setSelectedSection] = useState(localStorage.getItem('section') || sections[0]);

  function handleSection(event) {
    setSelectedSection(event.target.value)
    localStorage.setItem('section', event.target.value)
  }

  return (
    <div className="settings-section-wrapper">
        <h1 className="settings-description">Section:  </h1>
          <select name="parameters"
          className="section-parameters"
          value={selectedSection}
          onChange={handleSection}
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