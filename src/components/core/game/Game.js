import React, { Component } from 'react';
import Modal from './modal/Modal';
import './Game.css';

const listCell = [1,   2,  3,  4,
									5,   6,  7,  8,
									9,  10, 11, 12,
									13, 14, 15,  0];

class Game extends Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      time: 0,
      hole: 15,
      isStart: true,
      listCell: listCell.slice()
    };

    this.incrementer = null;

    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleContinueGame = this.handleContinueGame.bind(this);
  }


  handleChangeState(e) {

    if (this.state.isStart || !e.target.hasAttribute('data-cell')) {
      return false;
    }

    const id = e.target.getAttribute('data-cell');
    const index = this.state.listCell.indexOf(parseInt(id, 10));

    if (index < 0) {
      return false;
    }

    const emptyI = Math.floor(this.state.hole / 4);
    const emptyJ = this.state.hole % 4;
    const selectedI = Math.floor(index / 4);
    const selectedJ = index % 4;

    if ((Math.abs(emptyI - selectedI) === 1 && emptyJ === selectedJ) ||
      (Math.abs(emptyJ - selectedJ) === 1 && emptyI === selectedI)) {

      [this.state.listCell[index], this.state.listCell[this.state.hole]] = [this.state.listCell[this.state.hole], this.state.listCell[index]];

      this.setState(prevState => ({
        hole: index,
        counter: ++prevState.counter
      }));

      if (this.isCompleted()) {
        clearInterval(this.incrementer);

        const data = {
          time: this.state.time,
          counter: this.state.counter + 1
        };

        this._modal.addHistory(data);
        this._modal.openModal();

        this.handleContinueGame();
      }

    }
  }


  handleContinueGame() {

    this.setState(prevState => ({
      isStart: !prevState.isStart
    }));

    if (this.state.isStart) {

      this.incrementer = setInterval( this.tick.bind(this), 1000);

      this.setState(prevState => ({
        listCell: prevState.listCell.sort(Game.compareRandom),
        hole: prevState.listCell.indexOf(0)
      }));


    } else {

      clearInterval(this.incrementer);

      this.setState(prevState => ({
        time: 0,
        hole: 15,
        counter: 0,
        listCell: listCell.slice()
      }));

    }
  }


  tick() {
    this.setState(prevState => ({
      time: ++prevState.time
    }));
  }

  isCompleted() {
    for (let i = 0; i < listCell.length; i++) {
      if (this.state.listCell[i] !== listCell[i]) {
        return false;
      }
    }
    return true;
  }


  render() {
    return (
			<section>
				<div className="container">
					<div className="content">
						<div className="info clearfix">
							<span className="time"><span>Time: </span>{ Game.formattedSeconds(this.state.time) }</span>
							<span className="counter pull-right"><span>Counter: </span>{ this.state.counter }</span>
						</div>

						<div className="game-block clearfix" onClick={ this.handleChangeState }>
							<TableGame items={ this.state.listCell }/>
						</div>

						<div className="buttons clearfix">
							<button className="btn btn-primary start" onClick={ this.handleContinueGame }>{ this.state.isStart ? 'Start' : 'Stop' }</button>
              <Modal ref={(modal) => { this._modal = modal; }} />
						</div>
					</div>
				</div>


			</section>
    );
  }

  static compareRandom() {
    return Math.random() - 0.5;
  }

  static formattedSeconds(sec) {
    return `${ ('0' + Math.floor(sec / 60)).slice(-2) }:${ ('0' + sec % 60).slice(-2) }`;
  }
}


class TableGame extends React.Component {
  render() {
    return (
			<ul>
        {this.props.items.map(cell => {

        	if (cell === 0) {
        		return <li className="empty"></li>;
					} else {
            return <li data-cell={ cell }>{ cell }</li>;
					}

        })}
			</ul>
    );
  }
}

export default Game;
