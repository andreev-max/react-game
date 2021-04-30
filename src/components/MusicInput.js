import React, { useState } from 'react';
import { INIT_CONST } from '../utils/initConsts';
import { LOCAL_STORAGE_KEY } from '../utils/localStorageConsts';

export const MusicInput = () => {
	const [ musicValue, setMusicValue ] = useState(
		parseInt(localStorage.getItem(LOCAL_STORAGE_KEY.music)) || INIT_CONST.music
	);

	function handleMusicValue(event) {
		setMusicValue(event.target.value);
		localStorage.setItem(LOCAL_STORAGE_KEY.music, event.target.value);
	}

	return (
		<div className="settings-volume-wrapper">
			<h1 className="settings-description">
				{' '}
				Music volume:
				<span className="output-value"> {musicValue}</span>{' '}
			</h1>
			<div className="settings-volume-block">
				<span className="volume-value-min">0</span>
				<input
					type="range"
					value={musicValue}
					min="0"
					max="100"
					step="1"
					className="slider"
					onChange={handleMusicValue}
				/>
				<span className="volume-value-max">100</span>
			</div>
		</div>
	);
};
