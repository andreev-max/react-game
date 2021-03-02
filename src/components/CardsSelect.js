import React, { useState } from "react";
import { CARDSCOUNTER, INIT_CONST } from "./initConsts";
import { LOCAL_STORAGE_KEY } from "./localStorageConsts";

export const CardsCounter = () => {
  const [count, setCount] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEY.count) || INIT_CONST.count
  );

  function handleCardsCount(event) {
    setCount(event.target.value);
    localStorage.setItem(LOCAL_STORAGE_KEY.count, event.target.value);
  }

  return (
    <div className="settings-count-wrapper">
      <h1 className="settings-description">Cards count: </h1>
      <select
        name="parameters"
        className="count-cards-parameters"
        value={count}
        onChange={(event) => handleCardsCount(event)}
      >
        {CARDSCOUNTER.map((item) => {
          return (
            <option value={item} key={item} className="count-cards-parameter">
              {`  ${item} pair  `}
            </option>
          );
        })}
      </select>
    </div>
  );
};
