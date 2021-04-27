import React, { useState } from 'react';
import { FRONTCOLORS, INIT_CONST } from './initConsts';
import { LOCAL_STORAGE_KEY } from './localStorageConsts';

export const FrontColor = () => {
	const [ selectedColor, setSelectedColor ] = useState(
		localStorage.getItem(LOCAL_STORAGE_KEY.front) || INIT_CONST.front
	);

	function handleFrontColor(event) {
		setSelectedColor(event.target.value);
		localStorage.setItem(LOCAL_STORAGE_KEY.front, event.target.value);
	}

	return (
		<div className="settings-front-color-wrapper">
			<h1 className="settings-description">Front side color: </h1>
			<select
				name="parameters"
				className="front-color-parameters"
				value={selectedColor}
				style={{ backgroundColor: `${selectedColor}` }}
				onChange={handleFrontColor}
			>
				{FRONTCOLORS.map((color) => {
					return (
						<option key={color} className="front-color-parameters" style={{ background: `${color}` }} value={color} />
					);
				})}
			</select>
		</div>
	);
};
