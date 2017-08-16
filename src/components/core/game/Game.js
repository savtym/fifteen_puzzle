import React, { Component } from 'react';
import Modal from './modal/Modal';
import './Game.css';

const listCell = [0, 1, 2, 3, 
									4, 5, 6, 7, 
									8, 9, 10, 11, 
									12, 13, 14, 15];


class Game extends Component {

	compareRandom(a, b) {
	  return Math.random() - 0.5;
	}

	createListCell() {
		listCell.sort(this.compareRandom);

		this.listCell = listCell.map( (cell) =>
			`<li>${ cell }</li>`
		).join('');

		return { __html: this.listCell };
	}

  render() {
    return (
      <section>

      	<div className="info">
		      <span className="time">00:00</span>
		      <span className="counter">0</span>
		    </div>

		    <div className="game-block">
		      <ul dangerouslySetInnerHTML={this.createListCell()} />
		    </div>

		    <div className="buttons">
		      <button className="start">Start</button>
		      <button className="history">History</button>
		    </div>

		    <Modal />

      </section>
    );
  }
}

export default Game;
