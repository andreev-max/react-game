import React from 'react'

export const Card = ({ card, onClick }) => {
  return (
    <div
              className={`card ${card.isOpened ? 'opened' : ''}`}
              onClick={() => onClick()}
            >
                <div className={`back ${card.isFlipped ? 'rotate-back' : ''}`}
                style={{backgroundColor: `${localStorage.getItem('backColor')}`}}
                >
                </div>
                <div className={`front ${card.isFlipped ? 'rotate-front' : ''}`}
                style={{backgroundColor: `${localStorage.getItem('frontColor')}`}}
                >
                  <img
                  className="card-image"
                    src={card.imageSrc}
                    alt={card.value}
                    width="100"
                  />
                </div>
              </div>
  )
}