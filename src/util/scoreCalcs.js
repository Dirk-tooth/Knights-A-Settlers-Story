// score calc functions ¯\_(ツ)_/¯

const mostOf = (ourArray, ourItem) => {
  const theMax = Math.max.apply(null, ourArray.map(elt => elt[ourItem]));
  return ourArray.filter(elt => elt[ourItem] === theMax).length === 1 ?
	ourArray.find(elt => elt[ourItem] === theMax).color :
	'';
};

const checkGold = player => player.gold.least ? meta.gold.poorest : player.gold.most ? meta.gold.richest : 0;

const checkCards = player => (player.merchant ? meta.merchant.score : 0) +
	(player.constitution ? meta.constitution.score : 0) +
	(player.printer ? meta.printer.score : 0);

const calcPlayerScore = (color) => {
  const player = this.state.players.find(thisPlayer => thisPlayer.color === color);
  return Object.keys(this.state.masters).reduce((acc, item) => this.state.masters[item].winner === color ?
	this.state.masters[item].points :
	acc, 0) +
	(player.settlements * meta.settlements) +
	(player.cities * meta.cities) +
	(player.defenders * meta.defenders) +
	player.fish +
	meta.spices(player.spices) +
	meta.pirates(player.pirates) +
	this.checkCards(player);
};

export { mostOf, checkGold, checkCards, calcPlayerScore };
