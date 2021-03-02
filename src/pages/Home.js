import React, { useEffect, useState, useRef } from "react";
import { Game } from "../components/Game";
import useSound from "use-sound";
import fonSound from "../sounds/fon.mp3";
import { LOCAL_STORAGE_KEY } from "../components/localStorageConsts";

export const Home = () => {
  const [defeat, setDefeat] = useState(false);
  const [seconds, setSeconds] = useState(10);
  const foo = useRef();
  const [initGame, setInitGame] = useState(false);
  const musicValue = localStorage.getItem(LOCAL_STORAGE_KEY.music);

  const [playBg, { stop }] = useSound(fonSound, {
    volume: 0.0005 * musicValue,
  });

  function startGame() {
    setInitGame(true);
    if (!localStorage.getItem(LOCAL_STORAGE_KEY.stat)) {
      console.log(LOCAL_STORAGE_KEY.stat);
      const initStatistics = [];
      localStorage.setItem(
        LOCAL_STORAGE_KEY.stat,
        JSON.stringify(initStatistics)
      );
    }
  }

  useEffect(() => {
    if (initGame) {
      playBg();
    } else {
      stop();
    }
    return () => {
      stop();
    };
  }, [initGame, playBg, stop]);

  function endGame() {
    setInitGame(false);
  }

  return (
    <div className="game-box">
      {initGame ? (
        <Game endGame={endGame} />
      ) : (
        <button className="button-game start-button" onClick={startGame}>
          Start Game
        </button>
        
      )}
    </div>
  );
};
