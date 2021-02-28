import React, { useState } from 'react'

export const CardsCounter = () => {
  const cardsCounter = [4, 5, 6, 7, 8, 'all'];
  const [count, setCount] = useState(4);

  function handleCardsCount(event) {
    setCount((prev) => prev = event.target.value)
    localStorage.setItem('cardsCount', event.target.value)
  }

  return (
    <div className="settings-count-wrapper">
        <h1 className="settings-description">Cards count:  </h1>
          <select name="parameters"
          className="count-cards-parameters"
          value={localStorage.getItem('cardsCount') || count}
          onChange={(event) => handleCardsCount(event)}
          >
            {cardsCounter.map((item) => {
              return <option value={item}
              key={item}
              className="count-cards-parameter">
                {`  ${item} pair  `}
              </option>
            })}
          </select>
      </div>
  )
}