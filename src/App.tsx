import React from 'react';
import './App.css';
import GameBoard from './GameBoard';

function App() {
  return (
    <div className="App">
      <div className="title__container">
        <h2>Petals around Rose</h2>
      </div>
      <GameBoard />
    </div>
  );
}

export default App;
