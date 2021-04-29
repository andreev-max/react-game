import React, { useEffect, useState, useMemo } from 'react';
import { Game } from '../components/Game';
import fonSound from '../sounds/fon.mp3';
import { LOCAL_STORAGE_KEY } from '../components/localStorageConsts';
import { Howler } from 'howler';
import { createSound } from '../simpleFunc';
import { ALLCARDS, getBoard } from '../components/Board';
import { INIT_CONST } from '../components/initConsts';

export const Home = () => {
	const musicValue = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.music), []);
	const selectedSection = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.section) || INIT_CONST.section, []);
	const selectedCount = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.count) || INIT_CONST.count, []);
	const [ cards, setCards ] = useState([]);

	const [ initGame, setInitGame ] = useState(false);
	const [ autoplay, setAutoplay ] = useState(false);

	const audioFon = useMemo(() => createSound(fonSound, musicValue * 0.05, true), [ musicValue ]);

	function startGame() {
		const cleanCards = ALLCARDS.map((card) => {
			return {
				...card,
				isFlipped: false,
				isOpened: false
			};
		});
		setCards(() => getBoard(cleanCards, selectedSection, selectedCount));
		setAutoplay(false);
		setInitGame(true);
	}

	function startAutoPlay() {
		const cleanCards = ALLCARDS.map((card) => {
			return {
				...card,
				isFlipped: false,
				isOpened: false
			};
		});
		setAutoplay(true);
		setCards(getBoard(cleanCards, selectedSection, selectedCount));
		setInitGame(true);
	}

	useEffect(
		() => {
			if (initGame) {
				audioFon.play();
			} else {
				audioFon.stop();
			}
			return () => {
				Howler.stop();
			};
		},
		[ audioFon, initGame ]
	);
	function endGame() {
		setInitGame(false);
	}

	function newGame() {
		setInitGame(false);
		setTimeout(() => {
			const cleanCards = ALLCARDS.map((card) => {
				return {
					...card,
					isFlipped: false,
					isOpened: false
				};
			});
			setCards(getBoard(cleanCards, selectedSection, selectedCount));
			setInitGame(true);
		}, 300);
	}

	return (
		<div className="game-box">
			{initGame ? (
				<Game newGame={newGame} endGame={endGame} autoplay={autoplay} cards={cards} />
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
