import React, { Component } from 'react';
import ModalView from 'react-modal';
import './Modal.css';


const customStyles = {
  content : {
    top                   : '20%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -20%)',
    width                 : '480px'
  }
};

const keyLocalStorage = 'history_fifteen_puzzle';


class Modal extends Component {
  constructor() {
    super();

    const data = localStorage.getItem(keyLocalStorage);

    this.state = {
      history: (data) ? JSON.parse(data) : [],
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  addHistory(data) {
    this.state.history.push(data);
    localStorage.setItem(keyLocalStorage, JSON.stringify(this.state.history))
  }

  render() {
    return (
      <div style={{display: 'inline'}}>
        <button className="btn btn-info history pull-right" onClick={ this.openModal }>History</button>

        <ModalView
          isOpen={ this.state.modalIsOpen }
          onAfterOpen={ this.afterOpenModal }
          onRequestClose={ this.closeModal }
          style={customStyles}
          contentLabel="Modal for history game"
        >
          <div className="modal-content">
            <div className="modal-header">
              <div className="close clearfix">
                <span className="close pull-right" onClick={ this.closeModal }>&times;</span>
              </div>
              <h2>History</h2>
            </div>

            <div className="modal-body">
              <HistoryTable items={ this.state.history }/>
            </div>

          </div>
        </ModalView>

      </div>
    );
  }
}

class HistoryTable extends React.Component {
  render() {
    return (
      <table>
        <thead>
        <tr>
          <th>Time</th>
          <th>Counter</th>
        </tr>
        </thead>

        <tbody>
          {this.props.items.map(item =>
            <tr>
              <td>{ item.time }</td>
              <td>{ item.counter }</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default Modal;
