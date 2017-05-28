// score calc functions ¯\_(ツ)_/¯

import meta from '../proto/meta';

const mostOf = (ourArray, ourItem) => {
	const theMax = Math.max.apply(null, ourArray.map(elt => elt[ourItem]));
	return ourArray.filter(elt => elt[ourItem] === theMax).length === 1 ?
	ourArray.find(elt => elt[ourItem] === theMax).color :
	'';
};

const checkThreshold = (player) => {


};

const checkGold = (playerState, masters) =>
	masters.gold.richest === playerState.color ? meta.gold.richest : 0 +
	masters.gold.poorest === playerState.color ? meta.gold.poorest : 0;

const checkCards = player => (player.merchant ? meta.merchant.score : 0) +
	(player.constitution ? meta.constitution.score : 0) +
	(player.printer ? meta.printer.score : 0);

const calcPlayerScore = (playerState, masters) =>
	Object.keys(masters).reduce((acc, item) =>
		masters[item].winner === playerState.color ? masters[item].points : acc, 0) +
	checkGold(playerState, masters) +
	(playerState.settlements * meta.settlements) +
	(playerState.cities * meta.cities) +
	(playerState.defenders * meta.defenders) +
	playerState.fish +
	meta.spices(playerState.spices) +
	meta.pirates(playerState.pirates) +
	checkCards(playerState);

export { mostOf, checkThreshold, checkGold, checkCards, calcPlayerScore };
