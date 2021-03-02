import React, { useState, useEffect, useRef } from "react";
import useSound from "use-sound";
import flipCardSound from "../sounds/card.mp3";
import completeSound from "../sounds/complete.mp3";
import successSound from "../sounds/success.mp3";
import no from "../sounds/no.wav";
import fonSound from "../sounds/fon.mp3";
import failSound from "../sounds/fail.mp3";
import board from "./board";
import { Card } from "./Card";
import { LOCAL_STORAGE_KEY } from "./localStorageConsts";
import { getDate } from "../simpleFunc";
import { INIT_CONST, KEYS } from "./initConsts";

console.log(board);

export const Game = ({ endGame }) => {
  const [cards, setCards] = useState(board);
  const [hoveredCard, setHoveredCard] = useState(0);
  const [openedCards, setOpenedCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [defeat, setDefeat] = useState(false);
  const [seconds, setSeconds] = useState(100);
  const foo = useRef();

  function onKeyDown(event) {
    console.log(event.keyCode);
    switch (event.keyCode) {
      case KEYS.LEFT_ARROW:
        console.log("лево");
        setHoveredCard((prev) => {
          return hoveredCard === 0 ? cards.length : prev - 1;
        });
        break;
      case KEYS.RIGHT_ARROW:
        console.log("право");
        setHoveredCard((prev) => {
          return hoveredCard === cards.length ? 0 : prev + 1;
        });
        break;
      case KEYS.SPACE: {
        console.log("пробел");
        const card = cards[hoveredCard];
        flipCard(card.id, card.value);
        break;
      }
      default:
        return;
    }
  }

  function onMouseOver(index) {
    setHoveredCard(index);
  }

  const soundsValue = localStorage.getItem(LOCAL_STORAGE_KEY.sounds);
  const musicValue = localStorage.getItem(LOCAL_STORAGE_KEY.music);

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
  const [playBg, { stop }] = useSound(fonSound, {
    volume: 0.0005 * musicValue,
  });

  function flipCard(id, value) {
    playCardFlip();
    const card = {
      id,
      value,
    };
    setCards((prev) => {
      return prev.map((item) => {
        if (item.id !== id) {
          return item;
        }
        return {
          ...item,
          isFlipped: true,
        };
      });
    });
    setFlippedCards((prev) => [...prev, card]);
  }

  useEffect(() => {
    if (flippedCards.length < 2) return;
    const [firstFlippedCard, secondFlippedCard] = flippedCards;
    console.log(firstFlippedCard);
    console.log(secondFlippedCard);
    if (
      secondFlippedCard &&
      firstFlippedCard.value === secondFlippedCard.value &&
      firstFlippedCard.id !== secondFlippedCard.id
    ) {
      playSuccess();
      setOpenedCards((prev) => [
        ...prev,
        firstFlippedCard.id,
        secondFlippedCard.id,
      ]);
    } else {
      playNo();
      setTimeout(() => {
        setCards((prev) => {
          return prev.map((item) => {
            if (
              item.id === firstFlippedCard.id ||
              item.id === secondFlippedCard.id
            ) {
              return {
                ...item,
                isFlipped: false,
              };
            }
            return item;
          });
        });
      }, 600);
    }
    setFlippedCards([]);
  }, [flippedCards]);

  //! WIN
  useEffect(() => {
    if (openedCards.length >= board.length) {
      playComplete();
      const stat = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.stat));
      console.log(Array.isArray(stat));
      console.log(stat);
      const date = `${getDate()}`;
      const section =
        localStorage.getItem(LOCAL_STORAGE_KEY.section) || INIT_CONST.section;
      const count =
        localStorage.getItem(LOCAL_STORAGE_KEY.count) || INIT_CONST.count;
      const level =
        localStorage.getItem(LOCAL_STORAGE_KEY.level) || INIT_CONST.level;
      const game = { date, section, count, level };
      console.log({ game });
      stat.push(game);
      console.log({ stat });
      localStorage.setItem(LOCAL_STORAGE_KEY.stat, JSON.stringify(stat));
      endGame();
    }
  }, [openedCards]);

  useEffect(() => {
    function tick() {
      setSeconds((prev) => prev - 1);
    }
    foo.current = setInterval(() => tick(), 1000);
    return () => {
      endGame();
      clearInterval(foo.current);
    };
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      endGame();
      clearInterval(foo.current);
      playFail();
      setDefeat(true);
    }
  }, [seconds]);

  function newGame(event) {
    console.log(event.target);
  }

  return (
    <div className="game-wrapper">
      <div className="timer-button">
        <h1 className="timer-seconds">{seconds}</h1>
        <button className="button-game" onClick={newGame}>
          New Game
        </button>
      </div>
      <div className="board" tabIndex={0} onKeyDown={onKeyDown}>
        {cards.map((card, index) => {
          // if (openedCards.includes(card.id)) card.isOpened = true;
          return (
            <Card
              onMouseOver={() => {
                onMouseOver(index);
              }}
              hoveredByKeyboard={hoveredCard === index}
              key={index}
              card={card}
              onClick={() => {
                flipCard(card.id, card.value);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
