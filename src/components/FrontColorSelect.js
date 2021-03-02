import React, { useState } from "react";
import { INIT_CONST } from "./initConsts";
import { LOCAL_STORAGE_KEY } from "./localStorageConsts";

const frontColors = ["#008080", "#ffd700", "#111", "#79589F"];

export const FrontColor = () => {
  const [selectedColor, setSelectedColor] = useState(
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
        {frontColors.map((color) => {
          return (
            <option
              key={color}
              className="front-color-parameters"
              style={{ background: `${color}` }}
              value={color}
            ></option>
          );
        })}
      </select>
    </div>
  );
};
