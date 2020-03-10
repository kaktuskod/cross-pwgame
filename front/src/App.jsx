import React, { useState, useEffect } from "react";
import socketIO from "socket.io-client";
import AskNickname from "./components/AskNickname";
import MagicNumber from "./components/MagicNumber";

const App = () => {
  const [isGameStarted, setGameStarted] = useState(false);
  const [setHint] = useState('');
  const io = socketIO("http://localhost:3000");

  io.on("event::hello", () => {
    console.log("handshake");
  });

  io.on("event::gameFull", () => {
    console.log("Player 2 found, please wait game will start in few second");
    setGameStarted(true);
  });

  io.on("event::gameStarted", () => {
    console.log("Game started");
    setGameStarted(true);
  });

  io.on("event::gameStarted", () => {
    console.log("Game started");
    setGameStarted(true);
  });

  io.on("event::tryAgainHigher", () => {
    console.log("Try Higher");
    setHint("Higher");
  });

  io.on("event::tryAgainLower", () => {
    console.log("Lower");
    setHint("Lower");
  });

  io.on("event::tryAgainAlmost", () => {
    console.log("Almost bro");
    setHint("Almost");
  });

  io.on("event::youWin", () => {
    console.log("You win");
    setHint("Gold WINNER !");
  });




  return (
    <section className="hero is-fullheight is-light">
      <div className="hero-head">
        <div className="container">
          <div className="tabs is-centered">
            <ul>
              <li>
                <a>PWA Games</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="hero-body">
        <div className="container">
          <header className="bd-index-header">
            {!isGameStarted ? <AskNickname io={io} /> : <MagicNumber />}
          </header>
        </div>
      </div>

      <div className="hero-foot">
        <div className="container">
          <div className="tabs is-centered">
            <ul>
              <li>
                <a>Let's Rock!</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
