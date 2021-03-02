import React, { useState } from "react";
import easy from "../icons/easy.png";
import normal from "../icons/normal.png";
import hard from "../icons/hard.png";
import impossible from "../icons/impossible.png";
import suicide from "../icons/suicide.png";
import { LOCAL_STORAGE_KEY } from "./localStorageConsts";
import { INIT_CONST } from "./initConsts";

const levels = ["easy", "normal", "hard", "impossible", "suicide"];

const icons = [easy, normal, hard, impossible, suicide];

export const LevelSelect = () => {
  const [selectedLevel, setSelectedLevel] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEY.level) || INIT_CONST.level
  );

  function handleLevel(event) {
    setSelectedLevel(event.target.value);
    localStorage.setItem(LOCAL_STORAGE_KEY.level, event.target.value);
  }

  return (
    <div className="settings-level-wrapper">
      <h1 className="settings-description">Difficulty Level: </h1>
      <select
        name="parameters"
        className="level-parameters"
        value={selectedLevel}
        onChange={handleLevel}
      >
        {levels.map((level) => {
          return (
            <option key={level} value={level} className="level-parameters">
              {level}
            </option>
          );
        })}
      </select>
    </div>
  );
};
