const React = require('react');
const HeaderBar = require('./header.js');
const Player = require('./player.js');

const meta = {
	gold: {
		richest: 1,
		poorest: -2,
		affect: true,
	},
	settlements: 1,
	cities: 2,
	harbors: {
		threshold: 3,
		score: 2,
		affect: true,
	},
	roads: {
		threshold: 5,
		score: 2,
		affect: true,
	},
	knights: {
		threshold: 5,
		score: 2,
		affect: true,
	},
	fish: {
		score: 1,
		limit: 8,
	},
	spices: function(numSpices){
		switch(numSpices){
			case 1: return 1; break;
			case 2: return 2; break;
			case 3: return 3; break;
			case 4: return 5; break;
			case 5: return 8; break;
			case 6: return 13; break;
			default: return 0; break;
		}
	},
	pirates: function(numPirates){
		switch(numPirates){
			case 1: return 1; break;
			case 2: return 4; break;
			case 3: return 8; break;
			case 4: return 14; break;
			default: return 0; break;
		}
	},
	trade: {
		threshold: 4,
		score: 2,
		affect: true,
	},
	politics: {
		threshold: 4,
		score: 2,
		affect: true,
	},
	science: {
		threshold: 4,
		score: 2,
		affect: true,
	},
	defenders: 1,
	merchant: {
		score: 1,
		affect: true,
	},
	constitution: {
		score: 1,
	},
	printer: {
		score: 1,
	},
	boot: 1,
}

const protoPlayer = function(color) {
	return {
		color: color,
		gold: 4,
		settlements: 1,
		cities: 1,
		harbors: 0,
		roads: 1,
		knights: 0,
		fish: 0,
		spices: 0,
		pirates: 0,
		trade: 0,
		politics: 0,
		science: 0,
		defenders: 0,
		merchant: false,
		constitution: false,
		printer: false,
		boot: false,
	}
};

const colors = ['green', 'blue', 'red', 'white', 'orange', 'brown'];

class Default extends React.Component {
  constructor() {
    super();
	this.state = {
		players: [],
		winPoint: 20,
		masters:{
			wealthiest:{winner: "", points: meta.gold.richest},
			poorest:{winner: [], points: meta.gold.poorest},
			longestroad:{winner: "", points: meta.roads.score},
			harbormaster:{winner: "", points: meta.harbors.score},
			largestarmy:{winner: "", points: meta.knights.score},
			fishmaster:{winner: "", points: meta.fish.score},
			trade:{winner: "", points: meta.trade.score},
			politics:{winner: "", points: meta.politics.score},
			science:{winner: "", points: meta.science.score},
		}
		
			
			
	};
	for (let i = 0; i < 3; i++)  this.state.players.push(protoPlayer(colors[i]));
  }
  changeTopLevelState(key, value) {
	  this.setState({[key]: value});
  }
  handleShiftPlayers(action) {
	  action > 0 ? this.setState({ players: [...this.state.players, protoPlayer] }) : this.setState({players: this.state.players.slice(0, this.state.players.length - 1)});
  }
  
  mostOf(ourArray, ourItem) {
	  const theMax = Math.max.apply(null, ourArray.map(elt => elt[ourItem]));
	  return ourArray.filter(elt => elt[ourItem] === theMax).length === 1 ?
		ourArray.find(elt => elt[ourItem] === theMax).color :
		"";
	}

  checkGold(player) {
	  return player.gold.least ? meta.gold.poorest : player.gold.most ? meta.gold.richest : 0;
  }
  checkCards(player) {
	  return (player.merchant ? meta.merchant.score : 0) + 
			 (player.constitution ? meta.constitution.score : 0) +
			 (player.printer ? meta.printer.score : 0);
  }
  checkThreshold(player) {
	const theMax = Math.max.apply(null, ourArray.map(elt => elt[ourItem]));
	
  }
  
  changeScoreButton(color, scoreItem, delta) {
	  this.setState({ players: this.state.players.map(item => item.color === color ?
		Object.assign({}, item, { [scoreItem]: item[scoreItem] + delta) }) :
		item) });		
  }
  
  calcPlayerScore(color) {
	  const player = this.state.players.find(player => player.color === color);
	  return Object.keys(this.state.masters).reduce((acc, item) => this.state.masters[item].winner === color ?
		acc += this.state.masters[item].points :
		acc, 0) +
		player.settlements * meta.settlements +
		player.cities * meta.cities +
		player.defenders * meta.defenders +
		// this.checkThreshold(player) +
		player.fish +
		meta.spices(player.spices) +
		meta.pirates(player.pirates) +
		this.checkCards(player);
  }
  
  render() {
    return (
      <div>
		<HeaderBar
			players={this.state.players}
			winPoint={this.state.winPoint}
			onClick={(key, value) => this.changeTopLevelState(key,value)}
			onChange={(action) => this.handleShiftPlayers(action)}
		/>
		<div className="player-container">
			{this.state.players.map((item, idx) => {
					return <Player
							className="player"
							key={idx}
							score={this.calcPlayerScore(item.color)}
							winPoint={this.state.winPoint}
							playerState={item}
							incrementerButton={(color, scoreItem, delta) => this.changeScoreButton(color, scoreItem, delta)}
						  />
				}
			)}
		</div>
	  </div>
    );
  }
}

module.exports = Default;
