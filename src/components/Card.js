import React from "react";
import { LOCAL_STORAGE_KEY } from "./localStorageConsts";

export const Card = ({ onMouseOver, hoveredByKeyboard, card, onClick }) => {
  const classNames = ["card"];

  if (card.isOpened) {
    classNames.push("opened");
  }

  if (hoveredByKeyboard) {
    if (!card.isOpened) {
      classNames.push("flip");
    }
  }

  return (
    <div
      className={classNames.join(" ")}
      onClick={() => onClick()}
      onMouseOver={onMouseOver}
    >
      <div
        className={`back ${card.isFlipped ? "rotate-back" : ""}`}
        style={{
          backgroundColor: `${localStorage.getItem(LOCAL_STORAGE_KEY.back)}`,
        }}
      ></div>
      <div
        className={`front ${card.isFlipped ? "rotate-front" : ""}`}
        style={{
          backgroundColor: `${localStorage.getItem(LOCAL_STORAGE_KEY.front)}`,
        }}
      >
        <img
          className="card-image"
          src={card.imageSrc}
          alt={card.value}
          title={card.value}
          width="100"
        />
      </div>
    </div>
  );
};
