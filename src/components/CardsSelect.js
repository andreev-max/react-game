import React, { useState } from 'react'

const cardsCounter = [4, 5, 6, 7, 8, 'all'];

export const CardsCounter = () => {
  
  const [count, setCount] = useState(localStorage.getItem('cardsCount') || cardsCounter[0]);

  function handleCardsCount(event) {
    setCount(event.target.value)
    localStorage.setItem('cardsCount', event.target.value)
  }

  return (
    <div className="settings-count-wrapper">
        <h1 className="settings-description">Cards count:  </h1>
          <select name="parameters"
          className="count-cards-parameters"
          value={count}
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