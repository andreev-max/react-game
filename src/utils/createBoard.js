import _ from 'lodash';
import { getRandomInt, shuffleAllElements } from './helpers';

const lowerBoundForCreationId = 100;
const upperBoundForCreationId = 110;

function getSelectedCards(initArray, section, count) {
	if (section === 'all' && count === 'all') return initArray;
	let pair = 8;
	if (count === 'all') {
		pair = 8;
	} else {
		pair = parseInt(count);
	}
	let transformArray = [];
	if (section === 'all') {
		transformArray = initArray;
	} else {
		transformArray = initArray.filter((item) => item.section === section);
	}
	const transformArray2 = transformArray.sort(shuffleAllElements);
	const transformArray3 = transformArray2.splice(0, pair);
	return transformArray3;
}

export function getBoard(array, section, count) {
	const selectedCards = getSelectedCards(array, section, count);
	const selectedCardsDublicate = _.cloneDeep(selectedCards);
	const selectedPairOfCards = [ ...selectedCards, ...selectedCardsDublicate ];
	const shuffledSelectedPairOfCards = selectedPairOfCards.sort(shuffleAllElements);
	shuffledSelectedPairOfCards.forEach(
		(item, index) => (item.id = getRandomInt(index * lowerBoundForCreationId, index * upperBoundForCreationId))
	);
	console.log(shuffledSelectedPairOfCards);
	return shuffledSelectedPairOfCards;
}