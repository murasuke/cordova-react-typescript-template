import React from 'react';
import logo from './logo.svg';
import './App.css';

const click = () => {
  navigator.vibrate(1000);
  // alert('test');
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={click}>click</button>
      </header>
    </div>
  );
}

export default App;
