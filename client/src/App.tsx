import {useEffect} from 'react';
import { io } from "socket.io-client";
import logo from './logo.svg';
import './App.css';

const socket = io();

function App() {

function handleHi(){
  socket.emit('hi',{hi:Math.floor(Math.random()*100)})
}
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={handleHi}>Hi</button>
      </header>
    </div>
  );
}

export default App;
