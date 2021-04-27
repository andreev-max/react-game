import React from 'react';
import defeatFinger from '../icons/defeat-finger.png';

export const DefeatModal = ({ closeModal }) => {
	return (
		<div className="modal">
			<div className="modal-body modal-defeat">
				<h1 className="modal-title">Oh no!</h1>
				<h2 className="modal-subtitle">You are looooser!</h2>
				<img src={defeatFinger} alt="win finger" title="thumbs down" className="modal-icon" />
				<button className="button-game" onClick={closeModal}>
					Close
				</button>
			</div>
		</div>
	);
};
