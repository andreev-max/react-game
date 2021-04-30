import React from 'react';
import { LOCAL_STORAGE_KEY } from '../utils/localStorageConsts';
import demonIcon from '../assets/icons/suicide.png';

const statElems = [ 'Date', 'Section', 'Cards Count', 'Level' ];

export const Statistics = () => {
	const statRows = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.stat));
	return (
		<div className="stat-wrapper">
			<div className="stat-title">
				{statElems.map((elem) => {
					return (
						<div className="stat-title-elem" key={elem}>
							{elem}
						</div>
					);
				})}
			</div>
			<div className="stat-result">
				{statRows ? (
					statRows.map((row, index) => {
						return (
							<div className="stat-row" key={index}>
								{Object.values(row).map((elem, index) => {
									return (
										<div className="stat-row-elem" key={index}>
											{elem}
										</div>
									);
								})}
							</div>
						);
					})
				) : (
					<div className="stat-no-title">
						You don't have any statistics yet. Please go to the game tab and show what you can do
						<img src={demonIcon} alt="Demon icon" title="Demon" className="stat-icon" />
					</div>
				)}
			</div>
		</div>
	);
};
