import React, { useState } from "react";
import { INIT_CONST } from "./initConsts";
import { LOCAL_STORAGE_KEY } from "./localStorageConsts";

export const SoundsInput = () => {
  const [soundsValue, setSoundsValue] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEY.sounds) || INIT_CONST.sounds
  );

  function handleSoundsValue(event) {
    setSoundsValue(event.target.value);
    localStorage.setItem(LOCAL_STORAGE_KEY.sounds, event.target.value);
  }

  return (
    <div className="settings-volume-wrapper">
      <h1 className="settings-description">
        {" "}
        Music volume:
        <span className="output-value"> {soundsValue}</span>{" "}
      </h1>
      <div className="settings-volume-block">
        <span className="volume-value-min">0</span>
        <input
          type="range"
          value={soundsValue}
          min="0"
          max="100"
          step="1"
          className="slider"
          onChange={handleSoundsValue}
        />
        <span className="volume-value-max">100</span>
      </div>
    </div>
  );
};
