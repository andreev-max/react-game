import React, { useEffect, useState, useRef } from 'react'
import { Game } from '../components/Game'
import useSound from 'use-sound';
import fonSound from '../sounds/fon.mp3'
import { Timer } from '../components/Timer';

export const Home = () => {
  const [defeat, setDefeat] = useState(false);
  const [seconds, setSeconds] = useState(10);
  const foo = useRef();
  const [initGame, setInitGame] = useState(false);
  const musicValue = localStorage.getItem('musicValue');

  const [playBg, {stop}] = useSound(fonSound, {
      volume: 0.0005 * musicValue,
    });

  function startGame() {
    setInitGame(true);
    initGame ? playBg() : stop();
  }

  return (
    <div className="game-box">

      {initGame ? 
      <Game/>
      :
      <button className="btn btn-primary"
      onClick={startGame}
      >Start Game</button>}
    </div>
  )
}