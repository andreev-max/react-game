export const LEVELS = ["easy", "normal", "hard", "impossible", "suicide"];

export const SECTIONS = ["languages", "tools", "frameworks", "all"];

export const CARDSCOUNTER = [4, 5, 6, 7, 8, "all"];

export const FRONTCOLORS = ["#008080", "#ffd700", "#111", "#79589F"];

export const BACKCOLORS = ["#008080", "#ffd700", "#111", "#79589F"];

export const INIT_CONST = {
  level: LEVELS[0],
  section: SECTIONS[0],
  music: 0,
  sounds: 0,
  count: 4,
  front: FRONTCOLORS[0],
  back: BACKCOLORS[0],
};

export const KEYS = {
  RIGHT_ARROW: 39,
  LEFT_ARROW: 37,
  SPACE: 32,
};
