// @flow strict

import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import useNetworkState from './hooks/useNetworkState';

function App() {
  const [isOnline, connectedAt] = useNetworkState();
  const [count, setCount] = useState(0);

  function updateCount(): void {
    setCount(count + 1);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{isOnline ? 'Connected' : 'Disconnected'}</p>
        {isOnline ? connectedAt?.toDateString() : null}
        <button onClick={updateCount}>{count}</button>
      </header>
    </div>
  );
}

export default App;
