import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import logo from "./logo.svg";
import "./App.css";

const socket = io();

function App() {
  const [hiNumber, setHiNumber] = useState<number>(0);

  useEffect(() => {
    console.log('on')
    socket.on("hi", (msg) => {
      const { hi } = msg;
      if (hi) {
        setHiNumber(hi);
      }
    });
    return () => {
      console.log('off')
      socket.off("hi");
    };
  }, []);

  function handleHi() {
    socket.emit("hi", { hi: Math.floor(Math.random() * 100) });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{hiNumber}</p>
        <button onClick={handleHi}>Hi</button>
      </header>
    </div>
  );
}

export default App;