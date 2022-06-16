
// -----

import { useEffect, useState } from "react";

import logo from "./logo.svg";
import "./App.css";
import {socket} from './index';



function App() {
  const [hiNumber, setHiNumber] = useState(0);
  const [counterUI, setCounterUI] = useState(0);
  const [textPar, setTextPar] = useState('start');

  useEffect(() => {
    console.log("on");

    socket.on("counter", ({ counter }) => {
      console.log(counter);
      setCounterUI(counter);
    });

    socket.on("hi2", (msg) => {
      console.log(msg);
      const { hi } = msg;
      if (hi) {
        setHiNumber(hi);
      }
    });
    socket.on('msg',({text})=>{
      console.log(text)
      setTextPar(text);
    })
    return () => {
      console.log("off");
      socket.off("hi2");
      socket.off("counter");
    };
  }, []);

  function handleHi() {
    socket.emit("hi", { hi: Math.floor(Math.random() * 1000) });
  }

function handleText(ev:any){
  const text = ev.target.value;
  socket.emit('msg',{text})
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> - {counterUI} - </p>
        <p>{hiNumber}</p>
        <p>{textPar}</p>
        <button onClick={handleHi}>Hi</button>
        <input type='text' placeholder="enter text" onKeyUp={handleText} />
      </header>
    </div>
  );
}

export default App;
