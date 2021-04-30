import { Howl } from 'howler';

function showMonth(month) {
	const arr = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	return arr[month];
}

export function getDate() {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();
	const hours = date.getHours();
	let minutes;
	if (date.getMinutes() < 10) {
		minutes = `0${date.getMinutes()}`;
	} else {
		minutes = date.getMinutes();
	}
	return ` ${day} ${showMonth(month)} ${year} ${hours}:${minutes}`;
}

export function getRandomInt(min, max) {
	const roundedMin = Math.ceil(min);
	const roundedMax = Math.floor(max);
	return Math.floor(Math.random() * (roundedMax - roundedMin)) + roundedMin;
	//Максимум не включается, минимум включается
}

export function shuffleAllElements(a, b) {
	return Math.random() - 0.5;
}

export const createSound = (src, volume, loop = false) => new Howl({ src, volume: 0.01 * volume, loop });
