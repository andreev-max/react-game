import React, { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import flipCardSound from '../sounds/card.mp3';
import completeSound from '../sounds/complete.mp3';
import successSound from '../sounds/success.mp3';
import no from '../sounds/no.wav';
import failSound from '../sounds/fail.mp3';
import { ALLCARDS, getBoard } from './Board';
import { Card } from './Card';
import { LOCAL_STORAGE_KEY } from './localStorageConsts';
import { getDate } from '../simpleFunc';
import { INIT_CONST, KEYS, getSeconds } from './initConsts';
import { DefeatModal } from './DefeatModal';
import { WinModal } from './WinModal';

export const Game = ({ newGame, endGame, stopFonSound, autoplay }) => {
	//! localStorage
	const soundsValue = localStorage.getItem(LOCAL_STORAGE_KEY.sounds) || INIT_CONST.sounds;
	const musicValue = localStorage.getItem(LOCAL_STORAGE_KEY.music) || INIT_CONST.music;
	const selectedSection = localStorage.getItem(LOCAL_STORAGE_KEY.section) || INIT_CONST.section;
	const selectedCount = localStorage.getItem(LOCAL_STORAGE_KEY.count) || INIT_CONST.count;
	const selectedLevel = localStorage.getItem(LOCAL_STORAGE_KEY.level) || INIT_CONST.level;

	//! useState
	const [ hoveredCard, setHoveredCard ] = useState(0);
	const [ openedCards, setOpenedCards ] = useState([]);
	const [ flippedCards, setFlippedCards ] = useState([]);
	const [ defeat, setDefeat ] = useState(false);
	const [ win, setWin ] = useState(false);
	const [ cards, setCards ] = useState(() => getBoard(ALLCARDS, selectedSection, selectedCount));
	const [ seconds, setSeconds ] = useState(() => getSeconds(selectedCount, selectedLevel, selectedSection));
	const foo = useRef();

	//! Autoplay
	useEffect(
		() => {
			if (autoplay) {
				function autoplay(arr, num) {
					let index = num;
					console.log(arr[index]);
					setHoveredCard(index);
					flipCard(arr[index].id, arr[index].value);
					let secondCard = arr.find((card) => {
						return card.value === arr[index].value && card.id !== arr[index].id;
					});
					flipCard(secondCard.id, secondCard.value);
				}
				let count = 0;
				let timerId = setInterval(() => {
					if (count === (cards.length - 1) / 2) {
						setWin(true);
					}
					autoplay(cards, count);
					count += 1;
				}, 1000);
				setTimeout(() => {
					clearInterval(timerId);
				}, cards.length / 2 * 1000);
			}
		},
		[ autoplay ]
	);

	//! Sound
	const [ playCardFlip ] = useSound(flipCardSound, {
		volume: 0.005 * soundsValue
	});
	const [ playSuccess ] = useSound(successSound, {
		volume: 0.01 * soundsValue
	});
	const [ playNo ] = useSound(no, {
		volume: 0.01 * soundsValue
	});
	const [ playComplete ] = useSound(completeSound, {
		volume: 0.05 * musicValue
	});
	const [ playFail ] = useSound(failSound, {
		volume: 0.01 * musicValue
	});

	function onKeyDown(event) {
		switch (event.keyCode) {
			case KEYS.LEFT_ARROW:
				setHoveredCard((prev) => {
					let prevIndex = prev;
					function getHovered(index, prevIndex) {
						return hoveredCard === 0 || prevIndex === 0 ? cards.length - 1 : prev - (1 + index);
					}
					let counter = 0;
					let newIndex = getHovered(counter, prevIndex);

					while (openedCards.includes(cards[newIndex].id)) {
						counter += 1;
						prevIndex = newIndex;
						newIndex = getHovered(counter, prevIndex);
					}
					return newIndex;
				});
				break;
			case KEYS.RIGHT_ARROW:
				setHoveredCard((prev) => {
					let prevIndex = prev;
					function getHovered(index, prevIndex) {
						return hoveredCard === cards.length - 1 || prevIndex === cards.length - 1 ? 0 : prev + 1 + index;
					}
					let counter = 0;
					let newIndex = getHovered(counter, prevIndex);

					while (openedCards.includes(cards[newIndex].id)) {
						counter += 1;
						prevIndex = newIndex;
						newIndex = getHovered(counter, prevIndex);
					}
					return newIndex;
				});
				break;
			case KEYS.SPACE: {
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

	function flipCard(id, value) {
		if (openedCards.includes(id)) return;
		playCardFlip();
		const card = {
			id,
			value
		};
		setCards((prev) => {
			return prev.map((item) => {
				if (item.id !== id) {
					return item;
				}
				return {
					...item,
					isFlipped: true
				};
			});
		});
		setFlippedCards((prev) => [ ...prev, card ]);
	}

	useEffect(
		() => {
			if (flippedCards.length < 2) return;
			const [ firstFlippedCard, secondFlippedCard ] = flippedCards;
			if (
				secondFlippedCard &&
				firstFlippedCard.value === secondFlippedCard.value &&
				firstFlippedCard.id !== secondFlippedCard.id
			) {
				playSuccess();
				setOpenedCards((prev) => [ ...prev, firstFlippedCard.id, secondFlippedCard.id ]);
			} else {
				playNo();
				setTimeout(() => {
					setCards((prev) => {
						return prev.map((item) => {
							if (item.id === firstFlippedCard.id || item.id === secondFlippedCard.id) {
								return {
									...item,
									isFlipped: false
								};
							}
							return item;
						});
					});
				}, 600);
			}
			setFlippedCards([]);
		},
		[ flippedCards ]
	);

	//! WIN
	useEffect(
		() => {
			if (openedCards.length >= cards.length && openedCards.length > 3) {
				stopFonSound();
				clearInterval(foo.current);
				setWin(true);
				playComplete();
				const stat = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.stat));
				const date = `${getDate()}`;
				const section = localStorage.getItem(LOCAL_STORAGE_KEY.section) || INIT_CONST.section;
				const count = localStorage.getItem(LOCAL_STORAGE_KEY.count) || INIT_CONST.count;
				const level = localStorage.getItem(LOCAL_STORAGE_KEY.level) || INIT_CONST.level;
				const game = { date, section, count, level };
				stat.push(game);
				localStorage.setItem(LOCAL_STORAGE_KEY.stat, JSON.stringify(stat));
			}
		},
		[ openedCards ]
	);

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

	useEffect(
		() => {
			if (seconds === 0) {
				stopFonSound();
				setDefeat(true);
				clearInterval(foo.current);
			}
		},
		[ seconds ]
	);

	useEffect(
		() => {
			if (defeat && !win) {
				playFail();
			}
		},
		[ defeat ]
	);

	function closeModal() {
		setDefeat(false);
		setWin(false);
		endGame();
	}

	return (
		<div className="game-wrapper">
			<div className="timer-button">
				<h1 className="timer-seconds">{seconds}</h1>
				<h1 className="open-stat">
					{openedCards.length}&nbsp; / &nbsp;{cards.length}
				</h1>
				<button className="button-game" onClick={newGame}>
					New Game
				</button>
			</div>
			<div className="board" tabIndex={0} onKeyDown={onKeyDown}>
				{cards.map((card, index) => {
					if (openedCards.includes(card.id)) card.isOpened = true;
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
			{defeat && <DefeatModal closeModal={closeModal} />}
			{win && <WinModal closeModal={closeModal} />}
		</div>
	);
};
