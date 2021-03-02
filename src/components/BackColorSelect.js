import React, { useState } from "react";
import { INIT_CONST } from "./initConsts";
import { LOCAL_STORAGE_KEY } from "./localStorageConsts";

const backColors = ["#008080", "#ffd700", "#111", "#79589F"];

export const BackColor = () => {
  const [selectedColor, setSelectedColor] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEY.back) || INIT_CONST.back
  );

  function handleBackColor(event) {
    setSelectedColor(event.target.value);
    localStorage.setItem(LOCAL_STORAGE_KEY.back, event.target.value);
  }

  return (
    <div className="settings-back-color-wrapper">
      <h1 className="settings-description">Back side color: </h1>
      <select
        name="parameters"
        className="back-color-parameters"
        value={selectedColor}
        style={{ backgroundColor: `${selectedColor}` }}
        onChange={handleBackColor}
      >
        {backColors.map((color) => {
          return (
            <option
              key={color}
              className="back-color-parameters"
              value={color}
              style={{ backgroundColor: `${color}` }}
            ></option>
          );
        })}
      </select>
    </div>
  );
};
