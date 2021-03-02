import React from "react";
import { LOCAL_STORAGE_KEY } from "../components/localStorageConsts";

const statElems = ["#", "Date", "Section", "Cards Count", "Level"];

const statRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export const Statistics = () => {
  const stat = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.stat));
  console.log(stat);

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
        {statRows.map((row, index) => {
          return (
            <div className="stat-row" key={row}>
              {}
            </div>
          );
        })}
      </div>
    </div>
  );
};
