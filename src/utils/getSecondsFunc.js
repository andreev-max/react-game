import { SECTIONS } from './initConsts';
import { CARDSCOUNTER } from './initConsts';
import { LEVELS } from './initConsts';

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
