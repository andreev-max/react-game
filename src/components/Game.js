import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import flipCardSound from '../sounds/card.mp3';
import completeSound from '../sounds/complete.mp3';
import successSound from '../sounds/success.mp3';
import no from '../sounds/no.wav';
import failSound from '../sounds/fail.mp3';
import { Card } from './Card';
import { LOCAL_STORAGE_KEY } from './localStorageConsts';
import { getDate } from '../simpleFunc';
import { INIT_CONST, KEYS, getSeconds } from './initConsts';
import { DefeatModal } from './DefeatModal';
import { WinModal } from './WinModal';
import { Howler } from 'howler';
import { createSound } from '../simpleFunc';

export const Game = ({ newGame, endGame, autoplay, cards }) => {
	const soundsValue = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.sounds) || INIT_CONST.sounds, []);
	const musicValue = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.music) || INIT_CONST.music, []);
	const selectedSection = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.section) || INIT_CONST.section, []);
	const selectedCount = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.count) || INIT_CONST.count, []);
	const selectedLevel = useMemo(() => localStorage.getItem(LOCAL_STORAGE_KEY.level) || INIT_CONST.level, []);
	const soundFlip = useMemo(() => createSound(flipCardSound, soundsValue), [ soundsValue ]);
	const soundCorrect = useMemo(() => createSound(successSound, soundsValue), [ soundsValue ]);
	const soundFail = useMemo(() => createSound(no, soundsValue), [ soundsValue ]);
	const soundWin = useMemo(() => createSound(completeSound, musicValue), [ musicValue ]);
	const soundDefeat = useMemo(() => createSound(failSound, musicValue), [ musicValue ]);
	const [ win, setWin ] = useState(false);
	const [ defeat, setDefeat ] = useState(false);
	const timer = useRef();
	const [ seconds, setSeconds ] = useState(() => getSeconds(selectedCount, selectedLevel, selectedSection));

	const [ hoveredCard, setHoveredCard ] = useState(0);
	const [ openedCards, setOpenedCards ] = useState([]);
	const [ flippedCards, setFlippedCards ] = useState([]);

	const [ autoplayCounter, setAutoplayCounter ] = useState(0);
	const [ knownCards, setKnownCards ] = useState([]);

	const flipCard = useCallback(
		(id, value) => {
			soundFlip.play();
			cards.find((item) => item.id === id).isFlipped = true;
			setFlippedCards((prev) => [ ...prev, { id, value } ]);
		},
		[ cards, soundFlip ]
	);

	const checkTwoCards = useCallback(
		() => {
			if (flippedCards.length >= 2) {
				if (flippedCards[0].value === flippedCards[1].value && flippedCards[0].id === flippedCards[1].id) {
					cards.find((item) => item.id === flippedCards[0].id).isFlipped = false;
				} else if (flippedCards[0].value === flippedCards[1].value && flippedCards[0].id !== flippedCards[1].id) {
					soundCorrect.play();
					setOpenedCards((prev) => [ ...prev, flippedCards[0].id, flippedCards[1].id ]);
				} else {
					soundFail.play();
					setTimeout(() => {
						cards.find((item) => item.id === flippedCards[0].id).isFlipped = false;
						cards.find((item) => item.id === flippedCards[1].id).isFlipped = false;
					}, 450);
				}
				setFlippedCards([]);
			}
		},
		[ cards, flippedCards, soundCorrect, soundFail ]
	);

	useEffect(
		() => {
			if (autoplay && autoplayCounter + 1 <= cards.length) {
				flipCard(cards[autoplayCounter].id, cards[autoplayCounter].value);
				const knownCard = knownCards.find((item) => item.value === cards[autoplayCounter].value);
				setKnownCards((prev) => [ ...prev, { id: cards[autoplayCounter].id, value: cards[autoplayCounter].value } ]);
				if (knownCard && !flippedCards.length) {
					setTimeout(() => {
						flipCard(knownCard.id, knownCard.value);
						setTimeout(() => {
							setAutoplayCounter((prev) => prev + 1);
						}, 1000);
					}, 1000);
				} else {
					setTimeout(() => {
						setAutoplayCounter((prev) => prev + 1);
					}, 1000);
				}
			}
		},
		[ autoplay, autoplayCounter, cards, flipCard ]
	);

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

	useEffect(
		() => {
			// if (!autoplay) {
			checkTwoCards();
		},
		[ autoplay, cards, flippedCards, soundCorrect, soundFail ]
	);

	//! WIN
	useEffect(
		() => {
			if (openedCards.length >= cards.length && openedCards.length > 3) {
				if (!localStorage.getItem(LOCAL_STORAGE_KEY.stat)) {
					const initStatistics = [];
					localStorage.setItem(LOCAL_STORAGE_KEY.stat, JSON.stringify(initStatistics));
				}
				clearInterval(timer.current);
				setWin(true);
				setTimeout(() => {
					Howler.stop();
					soundWin.play();
				}, 300);
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
		[ cards.length, openedCards, soundWin ]
	);

	useEffect(
		() => {
			timer.current = setInterval(() => {
				setSeconds((prev) => prev - 1);
			}, 1000);
			return () => {
				endGame();
				clearInterval(timer.current);
			};
		},
		[ endGame ]
	);

	useEffect(
		() => {
			if (seconds <= 0) {
				setDefeat(true);
				setTimeout(() => {
					Howler.stop();
					soundDefeat.play();
				}, 300);
				clearInterval(timer.current);
			}
		},
		[ seconds, soundDefeat ]
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
				{!autoplay && (
					<button className="button-game" onClick={newGame}>
						New Game
					</button>
				)}
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
