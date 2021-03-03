import React from "react";
import winFinger from '../icons/win-finger.png'

export const WinModal = ({ closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-body modal-win">
        <h1 className="modal-title">Good job!</h1>
        <h2 className="modal-subtitle">You are monster!</h2>
        <img src={winFinger}
        alt="win finger"
        title="thumbs up"
        className="modal-icon"
        />
        <button
        className="button-game"
        onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};
