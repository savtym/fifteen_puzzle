import React, { Component } from 'react';
import Header from  './common/header/Header';
import Game   from  './core/game/Game';
import Footer from  './common/footer/Footer';


import './App.css';

class App extends Component {
  render() {
    return (
      <div className="content">
        <Header />
        <Game />
        <Footer />
      </div>
    );
  }
}

export default App;
