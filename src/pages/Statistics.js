import React from "react";
import { LOCAL_STORAGE_KEY } from "../components/localStorageConsts";

const statElems = ["Date", "Section", "Cards Count", "Level"];

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
        {statRows.map((row, index) => {
          console.log(row);
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
        })}
      </div>
    </div>
  );
};
