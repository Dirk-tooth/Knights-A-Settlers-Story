import React from 'react';
import { Button } from 'react-bootstrap';

const Player = props => (
  <div>
    <div className="score-row player-card">
      <h1>{props.score}</h1>
    </div>
    <div className="score-row gold">
      <img className="score-icons" src="./src/images/gold.png" alt="gold" />
      <Button className="minus-btn" onClick={() => props.incrementerButton(props.playerState.color, 'gold', -1)}>-</Button>
      {props.playerState.gold}
      <Button className="plus-btn btn" onClick={() => props.incrementerButton(props.playerState.color, 'gold', 1)}>+</Button>
    </div>
    <div className="score-row roads">
      <img className="score-icons" src="./src/images/road.svg" alt="road" />
      <Button className="minus-btn" onClick={() => props.incrementerButton(props.playerState.color, 'roads', -1)}>-</Button>
      {props.playerState.roads}
      <Button className="plus-btn btn" onClick={() => props.incrementerButton(props.playerState.color, 'roads', 1)}>+</Button>
    </div>
    <div className="score-row settlements">{props.playerState.settlements}</div>
    <div className="score-row cities">{props.playerState.cities}</div>
    <div className="score-row harbors">{props.playerState.harbors}</div>
    <div className="score-row knights">{props.playerState.knights}</div>
    <div className="score-row fish">{props.playerState.fish}</div>
    <div className="score-row spices">{props.playerState.spices}</div>
    <div className="score-row pirates">{props.playerState.pirates}</div>
    <div className="score-row trade">{props.playerState.trade}</div>
    <div className="score-row politics">{props.playerState.politics}</div>
    <div className="score-row science">{props.playerState.science}</div>
    <div className="score-row defenders">
      <img className="score-icons" src="./src/images/defenders.svg" alt="defenders" />
      <Button className="minus-btn" onClick={() => props.incrementerButton(props.playerState.color, 'defenders', -1)}>-</Button>
      {props.playerState.defenders}
      <Button className="plus-btn btn" onClick={() => props.incrementerButton(props.playerState.color, 'defenders', 1)}>+</Button>
    </div>
    <div className="score-row merchant">{props.playerState.merchant}</div>
    <div className="score-row constitution">{props.playerState.constitution}</div>
    <div className="score-row printer">{props.playerState.printer}</div>
    <div className="score-row boot">{props.playerState.boot}</div>
  </div>
	);

module.exports = Player;
