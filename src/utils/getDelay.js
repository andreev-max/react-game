import { reversedLEVELS } from './initConsts';


export function getDelay(autoplay, level) {
	let delay = 300;
	let multiplier = reversedLEVELS.findIndex(item => item === level);
	if (autoplay) {
		delay = delay + multiplier * 100;
	} else {
		delay = delay + 100 + multiplier * 40
	}
	return delay;
}
