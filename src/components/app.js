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
  spices(numSpices) {
    switch (numSpices) {
      case 1: return 1;
      case 2: return 2;
      case 3: return 3;
      case 4: return 5;
      case 5: return 8;
      case 6: return 13;
      default: return 0;
    }
  },
  pirates(numPirates) {
    switch (numPirates) {
      case 1: return 1;
      case 2: return 4;
      case 3: return 8;
      case 4: return 14;
      default: return 0;
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
};

const protoPlayer = color => ({
  color,
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
});

const colors = ['green', 'blue', 'red', 'white', 'orange', 'brown'];

class Default extends React.Component {
  constructor() {
    super();
    this.state = {
      players: [],
      winPoint: 20,
      masters: {
        wealthiest: { winner: '', points: meta.gold.richest },
        poorest: { winner: [], points: meta.gold.poorest },
        longestroad: { winner: '', points: meta.roads.score },
        harbormaster: { winner: '', points: meta.harbors.score },
        largestarmy: { winner: '', points: meta.knights.score },
        fishmaster: { winner: '', points: meta.fish.score },
        trade: { winner: '', points: meta.trade.score },
        politics: { winner: '', points: meta.politics.score },
        science: { winner: '', points: meta.science.score },
      },


    };
    for (let i = 0; i < 3; i += 1) this.state.players.push(protoPlayer(colors[i]));
  }
  changeTopLevelState(key, value) {
    this.setState({ [key]: value });
  }
  handleShiftPlayers(action) {
    action > 0 ?
		this.setState({ players: [...this.state.players, protoPlayer] }) :
		this.setState({ players: this.state.players.slice(0, this.state.players.length - 1) });
  }

  checkThreshold(player) {


  }

  changeScoreButton(color, scoreItem, delta) {
    this.setState({ players: this.state.players.map(item => item.color === color ?
		Object.assign({}, item, { [scoreItem]: item[scoreItem] + delta }) :
		item) });
  }

  render() {
    return (
      <div>
        <HeaderBar
          players={this.state.players}
          winPoint={this.state.winPoint}
          onClick={(key, value) => this.changeTopLevelState(key, value)}
          onChange={action => this.handleShiftPlayers(action)}
		/>
        <div className="player-container">
          {this.state.players.map((item, idx) => <Player
            className="player"
            key={idx}
            score={this.calcPlayerScore(item.color)}
            winPoint={this.state.winPoint}
            playerState={item}
            incrementerButton={(color, scoreItem, delta) => this.changeScoreButton(color, scoreItem, delta)}
							/>,
			)}
        </div>
      </div>
    );
  }
}

module.exports = Default;
