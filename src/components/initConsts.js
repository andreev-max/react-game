export const LEVELS = [ 'easy', 'normal', 'hard', 'impossible', 'suicide' ];

export const SECTIONS = [ 'languages', 'tools', 'frameworks', 'all' ];

export const CARDSCOUNTER = [ '4', '5', '6', '7', '8', 'all' ];

export const FRONTCOLORS = [ '#008080', '#ffd700', '#111', '#79589F' ];

export const BACKCOLORS = [ '#008080', '#ffd700', '#111', '#79589F' ];

export const INIT_CONST = {
	level: LEVELS[0],
	section: SECTIONS[0],
	music: 0,
	sounds: 0,
	count: 4,
	front: FRONTCOLORS[0],
	back: BACKCOLORS[2]
};

export const KEYS = {
	RIGHT_ARROW: 39,
	LEFT_ARROW: 37,
	SPACE: 32
};

export function getSeconds(pair, level, section) {
	const pairString = String(pair);
	let seconds = 0;
	if (section === SECTIONS[3] && pairString === CARDSCOUNTER[5]) {
		switch (level) {
			case LEVELS[4]:
				seconds = 70;
				break;
			case LEVELS[3]:
				seconds = 80;
				break;
			case LEVELS[2]:
				seconds = 95;
				break;
			case LEVELS[1]:
				seconds = 110;
				break;
			default:
				seconds = 120;
				break;
		}
	} else {
		if (pairString === CARDSCOUNTER[0]) {
			switch (level) {
				case LEVELS[4]:
					seconds = 6;
					break;
				case LEVELS[3]:
					seconds = 8;
					break;
				case LEVELS[2]:
					seconds = 10;
					break;
				case LEVELS[1]:
					seconds = 12;
					break;
				default:
					seconds = 14;
					break;
			}
		} else if (pairString === CARDSCOUNTER[1]) {
			switch (level) {
				case LEVELS[4]:
					seconds = 8;
					break;
				case LEVELS[3]:
					seconds = 11;
					break;
				case LEVELS[2]:
					seconds = 13;
					break;
				case LEVELS[1]:
					seconds = 16;
					break;
				default:
					seconds = 18;
					break;
			}
		} else if (pairString === CARDSCOUNTER[2]) {
			switch (level) {
				case LEVELS[4]:
					seconds = 11;
					break;
				case LEVELS[3]:
					seconds = 14;
					break;
				case LEVELS[2]:
					seconds = 16;
					break;
				case LEVELS[1]:
					seconds = 18;
					break;
				default:
					seconds = 20;
					break;
			}
		} else if (pairString === CARDSCOUNTER[3]) {
			switch (level) {
				case LEVELS[4]:
					seconds = 14;
					break;
				case LEVELS[3]:
					seconds = 16;
					break;
				case LEVELS[2]:
					seconds = 18;
					break;
				case LEVELS[1]:
					seconds = 20;
					break;
				default:
					seconds = 22;
					break;
			}
		} else if (pairString === CARDSCOUNTER[4]) {
			switch (level) {
				case LEVELS[4]:
					seconds = 17;
					break;
				case LEVELS[3]:
					seconds = 20;
					break;
				case LEVELS[2]:
					seconds = 23;
					break;
				case LEVELS[1]:
					seconds = 26;
					break;
				default:
					seconds = 30;
					break;
			}
		} else if (pairString === CARDSCOUNTER[5]) {
			switch (level) {
				case LEVELS[4]:
					seconds = 17;
					break;
				case LEVELS[3]:
					seconds = 20;
					break;
				case LEVELS[2]:
					seconds = 23;
					break;
				case LEVELS[1]:
					seconds = 26;
					break;
				default:
					seconds = 30;
					break;
			}
		}
	}
	return seconds;
}
