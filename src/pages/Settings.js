import React from "react";
import { BackColor } from "../components/BackColorSelect";
import { CardsCounter } from "../components/CardsSelect";
import { FrontColor } from "../components/FrontColorSelect";
import { LevelSelect } from "../components/LevelSelect";
import { MusicInput } from "../components/MusicInput";
import { SectionSelect } from "../components/SectionSelect";
import { SoundsInput } from "../components/SoundsInput";

export const Settings = () => {
  return (
    <div className="settings-wrapper">
      <LevelSelect />

      <CardsCounter />

      <SectionSelect />

      <MusicInput />

      <SoundsInput />

      <BackColor />

      <FrontColor />
    </div>
  );
};
