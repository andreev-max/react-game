import React, { useEffect, useState } from 'react';
import { Game } from '../components/Game';
import useSound from 'use-sound';
import fonSound from '../sounds/fon.mp3';
import { LOCAL_STORAGE_KEY } from '../components/localStorageConsts';

export const Home = () => {
	const musicValue = localStorage.getItem(LOCAL_STORAGE_KEY.music);

	const [ initGame, setInitGame ] = useState(false);
	const [ playFonSound, setPlayFonSound ] = useState(false);
	const [ autoplay, setAutoplay ] = useState(false);

	const [ playBg, { sound, stop } ] = useSound(fonSound, {
		volume: 0.0005 * musicValue,
		loop: true
	});

	function startGame() {
		setPlayFonSound(true);
		setInitGame(true);
		if (!localStorage.getItem(LOCAL_STORAGE_KEY.stat)) {
			const initStatistics = [];
			localStorage.setItem(LOCAL_STORAGE_KEY.stat, JSON.stringify(initStatistics));
		}
	}

	function startAutoPlay() {
		setPlayFonSound(true);
		setAutoplay(true);
		setInitGame(true);
	}

	useEffect(
		() => {
			if (playFonSound && initGame) {
				playBg();
			} else {
				stop();
			}
			return () => {
				stop();
			};
		},
		[initGame, playBg, playFonSound, sound, stop]
	);

	function endGame() {
		setInitGame(false);
	}

	function newGame() {
		setInitGame(false);
		setTimeout(() => {
			setInitGame(true);
		}, 300);
	}

	function stopFonSound() {
		setPlayFonSound(false);
	}

	return (
		<div className="game-box">
			{initGame ? (
				<Game newGame={newGame} endGame={endGame} stopFonSound={stopFonSound} autoplay={autoplay} />
			) : (
				<div className="start-buttons-wrapper">
					<button className="button-game start-button" onClick={startGame}>
						Start Game
					</button>
					<button className="button-game start-button" onClick={startAutoPlay}>
						Autoplay
					</button>
				</div>
			)}
		</div>
	);
};
