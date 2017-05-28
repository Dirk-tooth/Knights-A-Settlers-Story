import React from 'react';
import HeaderBar from './header';
import Player from './player';
// import meta from '../proto/meta';
import protoPlayer from '../proto/protoPlayer';
import { mostOf, calcPlayerScore } from '../util/scoreCalcs';

const colors = ['green', 'blue', 'red', 'white', 'orange', 'brown'];

class Default extends React.Component {
  constructor() {
    super();
    this.state = {
      players: [],
      winPoint: 20,
      masters: {
        roads: '',
        harbors: '',
        knights: '',
        fish: '',
        trade: '',
        politics: '',
        science: '',
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
  changeScoreButton(color, scoreItem, delta) {
    const newPlayers = this.state.players.map(item => item.color === color ?
			Object.assign({}, item, { [scoreItem]: item[scoreItem] + delta }) :
			item);
    this.setState({ players: newPlayers,
      masters: this.state.masters.hasOwnProperty(scoreItem) ?
				Object.assign({}, this.state.masters, {
  [scoreItem]: mostOf(newPlayers, scoreItem) === '' ?
						this.state.masters[scoreItem] :
						mostOf(newPlayers, scoreItem),
}) :
				this.state.masters,
    });
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
            score={calcPlayerScore(item, this.state.masters, this.state.players)}
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
