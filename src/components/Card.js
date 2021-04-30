import React from 'react';
import { LOCAL_STORAGE_KEY } from '../utils/localStorageConsts';
import classNames from 'classnames';

export const Card = ({ onMouseOver, hoveredByKeyboard, card, onClick, autoplay }) => {
	const frontClass = classNames({
		front: true,
		'rotate-front': card.isFlipped
	});
	const backClass = classNames({
		back: true,
		'rotate-back': card.isFlipped
	});
	const cardClass = classNames({
		card: true,
		opened: card.isOpened,
		flip: hoveredByKeyboard && !card.isOpened
	});

	function handleClick() {
		if (!autoplay) {
			onClick();
		}
	}

	return (
		<div className={cardClass} onClick={handleClick} onMouseOver={onMouseOver}>
			<div
				className={backClass}
				style={{
					backgroundColor: `${localStorage.getItem(LOCAL_STORAGE_KEY.back)}`
				}}
			/>
			<div
				className={frontClass}
				style={{
					backgroundColor: `${localStorage.getItem(LOCAL_STORAGE_KEY.front)}`
				}}
			>
				<img className="card-image" src={card.imageSrc} alt={card.value} title={card.value} width="100" />
			</div>
		</div>
	);
};
