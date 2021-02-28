import React, {useState, useEffect, useRef } from 'react'
import useSound from 'use-sound';
import flipCardSound from '../sounds/card.mp3'
import completeSound from '../sounds/complete.mp3'
import successSound from '../sounds/success.mp3'
import no from '../sounds/no.wav'
import fonSound from '../sounds/fon.mp3'
import failSound from '../sounds/fail.mp3'
import board from './Board'
import { Card } from './Card'

console.log(board);

export const Game = (props) => {
  const [cards, setCards] = useState(board);
  const [openedCards, setOpenedCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [defeat, setDefeat] = useState(false);
  const [seconds, setSeconds] = useState(10);
  const foo = useRef();

  const soundsValue = localStorage.getItem('soundsValue');
  const musicValue = localStorage.getItem('musicValue');

  const [playCardFlip] = useSound(flipCardSound, {
    volume: 0.005 * soundsValue,
  });
  const [playSuccess] = useSound(successSound, {
    volume: 0.01 * soundsValue,
  });
  const [playNo] = useSound(no, {
    volume: 0.01 * soundsValue,
  });
  const [playComplete] = useSound(completeSound, {
    volume: 0.05 * soundsValue,
  });
  const [playFail] = useSound(failSound, {
    volume: 0.01 * soundsValue,
  });
  const [playBg, {stop}] = useSound(fonSound, {
      volume: 0.0005 * musicValue,
    });  

  function flipCard(id, value) {
    playCardFlip();
    const card = {
      id: id,
      value: value
    }
    setCards(prev => {
      return prev.map((item) => {
        if (item.id !== id) {
          return item
        }
        return {
          ...item,
          isFlipped: true
        }
      })
    })
    setFlippedCards((prev) => [...prev, card]);
  }
  
  useEffect(() => {
    if (flippedCards.length < 2) return;
    const firstFlippedCard = flippedCards[0];
    const secondFlippedCard = flippedCards[1];
    console.log(firstFlippedCard);
    console.log(secondFlippedCard);
    if (secondFlippedCard && firstFlippedCard.value === secondFlippedCard.value && firstFlippedCard.id !== secondFlippedCard.id) {
      playSuccess();
      setOpenedCards((prev) => [...prev,
        firstFlippedCard.id,
        secondFlippedCard.id])
    } else {
      playNo();
      setTimeout(() => {
        setCards(prev => {
          return prev.map((item) => {
            if (item.id === firstFlippedCard.id || item.id === secondFlippedCard.id) {
              return {
                ...item,
              isFlipped: false
            }
          }
          return item
        })
      })
      }, 600) 
    }
    setFlippedCards([]);

  }, [flippedCards])

  useEffect(() => {
    if (openedCards.length >= board.length) {
      playComplete();
      console.log('you win')
    }
  }, [openedCards])

  useEffect(()  => {
    function tick() {
      setSeconds((prev) => prev - 1)
    }
    foo.current = setInterval(() => tick(), 1000)
  }, [])

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(foo.current);
      playFail();
      setDefeat(true)
    }
  }, [seconds])

  function newGame(event) {
    console.log(event.target)
  }

  return (
    <div className="game-wrapper">
      <div className="timer-button">
        <h1 className="timer-seconds">{seconds}</h1>
        <button className="button-new-game"
        onClick={(event) => {newGame(event)}}>
          New Game
        </button>
      </div>
      <div className="board">
      {cards.map((card, index) => {
        if (openedCards.includes(card.id)) card.isOpened = true; 
        return (
          <Card key={index}
          card={card}
          onClick={() => {
            flipCard(card.id, card.value);
          }}/>
        )
      })}
    </div>
    </div>
    
  )
}