// score calc functions ¯\_(ツ)_/¯

function checkLeast(target, item){
	return Object.keys(gameState).reduce((acc, player) => {
		return (player === 'numPlayers' || player === 'winCondition') ? null :
		(acc && gameState[player][item] >= gameState[target][item]) ? acc = true : acc = false;
	}, true)
}

function checkMost(target, item){
	return Object.keys(gameState).reduce((acc, player) => {
		return (player === 'numPlayers' || player === 'winCondition') ? null :
		(acc && gameState[player][item] < gameState[target][item]) ? acc = true : acc = false;
	}, true)
}

var checkGold = player => gameState[player].gold.least ? meta.gold.poorest : gameState[player].gold.most ? meta.gold.richest : 0;

function checkThreshold(player){
	return Object.keys(meta).reduce((acc, key) => {
		return (meta[key].hasOwnProperty('threshold') && gameState[player][key].most) ? acc += meta[key].score : acc;
	}, 0);
}

var checkCards = player => (gameState[player].merchant ? meta.merchant.score : 0) + 
						(gameState[player].constitution ? meta.constitution.score : 0) +
						(gameState[player].printer ? meta.printer.score : 0);

function calcScore(player){
	return checkGold(player) +
		gameState[player].settlements * meta.settlements +
		gameState[player].cities * meta.cities +
		gameState[player].defenders * meta.defenders +
		checkThreshold(player) +
		gameState[player].fish +
		meta.spices(gameState[player].spices) +
		meta.pirates(gameState[player].pirates) +
		checkCards(player);
}

function calcAllScore(){
	return Object.keys(gameState).reduce((acc, player) => {
		return (player === 'numPlayers' || player === 'winCondition') ? null : acc.push(calcScore(gameState[player]));
	}, [])
}

export {checkLeast, checkMost, checkGold, checkThreshold, checkCards, calcScore, calcAllScore};